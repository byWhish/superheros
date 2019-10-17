import React, { useReducer, useCallback, useState, useEffect } from 'react';
import './App.css';
import SuperheroItem from "./components/SuperheroItem";
import nanoid from 'nanoid';
// import ReactJson from 'react-json-view'
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import { saveAs } from 'file-saver';

const empty = {
    id: "",
    order: "",
    type: "vod",
    img: "/img/home/superhero/",
    imgMobile: "/img/home/superhero/",
    startDate: "",
    endingDate: "",
    options: {
        conditional: false,
        showTitle: false,
        showMobile: false,
        showWeb: false,
        AR: true,
        PY: true,
        UY: true,
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'replace':
            const heros = new Map();
            action.value.forEach(item => heros.set(nanoid(4), item));
            return heros;
        case 'update':
            const proxyUpdate = state.get(action.id);
            proxyUpdate[action.field] = action.value;
            return new Map(state);
        case 'option':
            const proxyOptions = state.get(action.id);
            proxyOptions.options[action.field] = action.value;
            return new Map(state);
        case 'save':
            state.set(action.id, action.value);
            return new Map(state);
        case 'remove':
            state.delete(action.id);
            return new Map(state);
        default:
    }
}

const App = () => {
    const [items, dispatchItem] = useReducer(reducer, new Map());
    const [url, setUrl] = useState('');

    const fetchJson = useCallback(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                dispatchItem({ value: response, type: 'replace' });
                localStorage.setItem('lastUrl', url);
            });
    }, [url]);

    const handleAddHero = useCallback(() => {
        dispatchItem({ value: {...empty}, id: nanoid(4), type: 'save'})
    }, []);

    const handleDeleteHero = useCallback((id) => () => {
        dispatchItem({ id , type: 'remove'})
    }, []);

    const handleOnChange = useCallback((field, id) => (e) => {
        dispatchItem({ value: e.target.value, field, id, type: 'update' });
    }, []);

    const handleOnOptionChange = useCallback((field, id) => (e) => {
        dispatchItem({ value: e.target.checked, field, id, type: 'option' });
    }, []);

    const onUrlChange = useCallback((e) => {
        setUrl(e.target.value);
    }, []);

    useEffect(() => {
        setUrl(localStorage.getItem('lastUrl'));
    }, []);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(Array.from(items).map(([,value]) => value), null, 2))
            .then(() => alert('Json copied to clipboard'))
            .catch(() => alert('Unable to copy to clipboard'))
    }, [items]);

    const saveToFile = useCallback((region) => {
        const blob = new Blob([JSON.stringify(Array.from(items)
            .map(([,value]) => value)
            .filter(value => value.options[region])
            .map((value) => {
                const proxyValue = { ...value, options: { ...value.options } };
                delete(proxyValue.order);
                delete(proxyValue.options.AR);
                delete(proxyValue.options.PY);
                delete(proxyValue.options.UY);
                return proxyValue;
        }), null, 2)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `superhero-es-${region}.txt`);
    }, [items]);

    const handleSaveFileClick = useCallback(() => {
        saveToFile('AR');
        saveToFile('PY');
        saveToFile('UY');
    }, [saveToFile]);

    return (
        <div className="App">
            <div className="fetchWrapper">
                <input size={100} onChange={onUrlChange} value={url}/><button onClick={fetchJson}>Fetch json</button>
            </div>
            <div className="herosWrapper">
            <div className="leftPanel">
                <button onClick={handleAddHero} style={{ width: '100px' }}>Add Hero</button>
                <div className="heroList">
                    {Array.from(items).map(([key, hero]) => <SuperheroItem hero={hero} key={key} id={key} onChange={handleOnChange} onOptionChange={handleOnOptionChange} onDeleteHero={handleDeleteHero} />)}
                </div>
            </div>
            <div className="rightPanel">
                <div className="buttons">
                    <button style={{ width: '200px' }} onClick={copyToClipboard}>Copy to clipboard</button>
                    <button style={{ width: '200px' }} onClick={handleSaveFileClick}>Save to file</button>
                </div>
                <div className="heroList">
                    <JSONPretty
                        data={Array.from(items).map(([,value]) => value)
                            .sort((a,b) => parseInt(a.order, 10) - parseInt(b.order,10))
                            .map(value => {
                                const proxyValue = { ...value, options: { ...value.options } };
                                delete(proxyValue.order);
                                delete(proxyValue.options.AR);
                                delete(proxyValue.options.PY);
                                delete(proxyValue.options.UY);
                                return proxyValue;
                            })}
                        theme={JSONPrettyMon}
                        style={{ width: '100%'}}
                    />
                </div>
            </div>
            </div>
        </div>
  );
};

export default App;

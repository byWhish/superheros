import React from 'react';
import './SuperheroItem.css';

const SuperheroItem = ({ hero, onChange, id, onOptionChange, onDeleteHero }) => {
    return (
        <div className="itemWrapper">
            <div className="textNode">
                    {/*<label>ID</label>*/}
                    <input type="text" placeholder="ID" value={hero.id} onChange={onChange('id', id)}/>
                    {/*<label>Archivo web</label>*/}
                    <input type="text" placeholder="Archivo web" size={45} value={hero.img} onChange={onChange('img', id)}/>
                    {/*<label>Archivo mobile</label>*/}
                    <input type="text" placeholder="Archivo mobile" size={45} value={hero.imgMobile} onChange={onChange('imgMobile', id)}/>
                    {/*<label>Start DateTime</label>*/}
                    <input type="text" placeholder="Start DateTime" size={20} value={hero.startDate} onChange={onChange('startDate', id)}/>
                    {/*<label>End DateTime</label>*/}
                    <input type="text" placeholder="End DateTime" size={20} value={hero.endingDate} onChange={onChange('endingDate', id)}/>
                <div className="option">
                    {/*<label>Content type</label>*/}
                    <select value={hero.type} onChange={onChange('type', id)}>
                        <option value="vod_series">vod_series</option>
                        <option value="vod">vod</option>
                        <option value="tv_schedule">tv_schedule</option>
                    </select>
                </div>
            </div>
            <div className="checkNode">
                <div className="option">
                    <input type="checkbox" checked={hero.options.showWeb} onChange={onOptionChange('showWeb', id)}/><label>web</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.showMobile} onChange={onOptionChange('showMobile', id)}/><label>mobile</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.showAndroid} onChange={onOptionChange('showAndroid', id)}/><label>android</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.showIOS} onChange={onOptionChange('showIOS', id)}/><label>IOS</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.showSmartTV} onChange={onOptionChange('showSmartTV', id)}/><label>SmartTV</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.showTitle} onChange={onOptionChange('showTitle', id)}/><label>title</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.conditional} onChange={onOptionChange('conditional', id)}/><label>conditional</label>
                </div>
                <div className="option">
                    <input type="number" value={hero.order} style={{ width: '50px' }} onChange={onChange('order', id)}/>
                    <label>order</label>
                </div>
            </div>
            <div className="checkNode">
                <div className="option">
                    <input type="checkbox" checked={hero.options.AR} onChange={onOptionChange('AR', id)}/><label>AR</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.UY} onChange={onOptionChange('UY', id)}/><label>UY</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.PY} onChange={onOptionChange('PY', id)}/><label>PY</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.Lite} onChange={onOptionChange('Lite', id)}/><label>Lite</label>
                </div>
                <div className="option">
                    <input type="checkbox" checked={hero.options.Dibox} onChange={onOptionChange('Dibox', id)}/><label>Dibox</label>
                </div>
                <button onClick={onDeleteHero(id)}>Remove</button>
            </div>
        </div>
    )
};

export default SuperheroItem;

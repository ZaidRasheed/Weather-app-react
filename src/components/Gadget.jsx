import React, { useEffect, useState } from "react";

function Gadget(props) {

    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }
    const [expanded, setExpanded] = useState("");
    useEffect(() => {
        setExpanded(props.icon === null ? "" : "expanded")

    }, [props.icon])
    const element = (
        <div>
            {expanded === "expanded" ? null :
                <div className="error">
                    <h1>404 Error invalid location</h1>
                </div>
            }
            <div id="expand-container">
                <div className={`main ${expanded}`} id="expand-contract">
                    <div>
                        <div className="level1">
                            <div className="img">
                                <img src={`https://openweathermap.org/img/wn/${props.icon}@4x.png`} />
                            </div>
                            <div className="basic">
                                <h1>{props.cityName}, {props.country}</h1>
                                <span className="temp">{parseFloat(props.temp).toFixed(1)}°</span>
                            </div>

                        </div>
                        <div className="level2">
                            <h2>
                                {capitalize(props.description)}
                            </h2>
                            <h2>
                                Real feel {parseFloat(props.feels_like).toFixed(1)}°
                            </h2>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bottom">

                <div className="bySearch">
                    <div className="field field_v1">
                        <label htmlFor="first-name" className="ha-screen-reader">
                            city name
                        </label>
                        <input
                            onChange={(event) => {
                                const { value } = event.target;
                                props.setcityNameSearch(value);
                            }}
                            type="text"
                            name="city"
                            value={props.cityNameSearch}
                            id="first-name"
                            className="field__input"
                            placeholder="e.g. Paris" />
                        <span className="field__label-wrap" aria-hidden="true">
                            <span className="field__label">City name</span>
                        </span>
                    </div>
                    <button className="button bySearchButton" onClick={props.bySearch} >Search</button>
                </div>
                <div className="byCurrentlLocation">
                    <button className="button" onClick={props.getCurrentLocation}>Current location</button>
                </div>
            </div>
        </div>
    )

    return element;
}

export default Gadget;
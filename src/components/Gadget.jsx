import { useRef } from "react";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function Gadget({ data, error, bySearch, setError }) {

    const cityName = useRef()
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!cityName.current.value.trim())
            return setError('Please provide a valid location')
        
        bySearch(cityName.current.value);
    }

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div>
            <div className="bottom">
                <div className="bySearch">
                    <form onSubmit={handleSubmit}>
                        <div className="field field_v1">
                            <label htmlFor="first-name" className="ha-screen-reader">
                                city name
                            </label>
                            <input
                                type="text"
                                name="city"
                                ref={cityName}
                                id="first-name"
                                className="field__input"
                                placeholder="e.g. Paris" />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">City name</span>
                            </span>
                        </div>
                        <button className="button bySearchButton" type="submit">Search</button>
                    </form>
                </div>
            </div>

            {error ?
                <div className="error">
                    {error}
                </div>
                :
                <article className="box weather">
                    <div className="icon">
                        {data.icon && <img alt="weather icon" src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`} />}
                    </div>

                    <span style={{ marginTop: '10px' }} className="high-low">{capitalize(data.description)}</span>
                    <h1>{weekday[new Date().getDay()]}</h1>

                    <span className="temp">{parseFloat(data.temp).toFixed(1)}&deg;</span>
                    <span className="high-low">{data.min.toFixed(1)}&deg; - {data.max.toFixed(1)}&deg;</span>
                    <span className="high-low">{data.city}, {data.country}</span>
                </article>
            }
        </div >
    )
}

export default Gadget;
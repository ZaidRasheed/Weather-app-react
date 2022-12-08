import React, { useState } from "react";
import axios from "axios";
import Gadget from "./Gadget";

function App() {
    const [lastSearchName, setLastSearchName] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState({
        city: "NA",
        country: "NA",
        feels_like: 0,
        max: 0,
        min: 0,
        temp: 0,
        icon: null,
    });

    function bySearch(cityName) {
        setError('')

        if (lastSearchName === cityName) {
            return
        }
        else {
            setLastSearchName(cityName)
            axios({
                method: "get",
                url: "https://api.openweathermap.org/data/2.5/weather",
                params: {
                    q: cityName,
                    appid: process.env.REACT_APP_apiId,
                    units: "metric"
                },
            }).then(res => {
                let data = res.data;
                setData({
                    city: data.name,
                    country: data.sys.country,
                    feels_like: data.main.feels_like,
                    icon: data.weather[0].icon,
                    temp: data.main.temp,
                    max: data.main.temp_max,
                    min: data.main.temp_min,
                    description: data.weather[0].description,
                })
            }).catch(error => {
                setError("Error, Couldn't find location.")
            });
        }

    }

    const element = (
        <Gadget
            bySearch={bySearch}
            data={data}
            error={error}
            setError={setError}
        />
    )
    return element;
}

export default App;
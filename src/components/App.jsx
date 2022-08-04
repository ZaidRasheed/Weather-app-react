import React, { useEffect, useState } from "react";
import axios from "axios";
import Gadget from "./Gadget";

function App() {

    const [loc, setLoc] = useState({
        lat: null,
        long: null
    });

    const [cityNameSearch, setCityNameSearch] = useState("");
    const [data, setData] = useState({
        city: "NA",
        country: "NA",
        feels_like: "NA",
        temp: "NA",
        icon: null,

    });
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLoc(() => {
                    return {
                        long: position.coords.longitude,
                        lat: position.coords.latitude
                    }
                })
                axios({
                    method: "get",
                    url: "https://api.openweathermap.org/data/2.5/forecast",
                    params: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        appid: process.env.REACT_APP_apiId,
                        units: "metric"
                    },

                }).then(res => {
                    let data = res.data;
                    setData(() => {
                        return {
                            city: data.city.name,
                            country: data.city.country,
                            feels_like: data.list[0].main.feels_like,
                            icon: data.list[0].weather[0].icon,
                            temp: data.list[0].main.temp,
                            description: data.list[0].weather[0].description,
                        }
                    })
                }).catch(err => {
                    if (err.response || err.request) {
                        setData(() => {
                            return {
                                city: null,
                                country: null,
                                feels_like: null,
                                icon: null,
                                temp: null,
                            }
                        })
                    }

                })
            });
        }
    }, [])



    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLoc(() => {
                    return {
                        long: position.coords.longitude,
                        lat: position.coords.latitude
                    }
                })
                axios({
                    method: "get",
                    url: "https://api.openweathermap.org/data/2.5/forecast",
                    params: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        appid: process.env.REACT_APP_apiId,
                        units: "metric"
                    },

                }).then(res => {
                    let data = res.data;
                    setData(() => {
                        return {
                            city: data.city.name,
                            country: data.city.country,
                            feels_like: data.list[0].main.feels_like,
                            icon: data.list[0].weather[0].icon,
                            temp: data.list[0].main.temp,
                            description: data.list[0].weather[0].description,
                        }
                    })
                }).catch(err => {
                    if (err.response || err.request) {
                        setData(() => {
                            return {
                                city: null,
                                country: null,
                                feels_like: null,
                                icon: null,
                                temp: null,
                            }
                        })
                    }

                })
            });
        }
    }

    function bySearch() {
        axios({
            method: "get",
            url: "https://api.openweathermap.org/data/2.5/weather",
            params: {
                q: cityNameSearch,
                appid: process.env.REACT_APP_apiId,
                units: "metric"
            },

        }).then(res => {
            let data = res.data;
            setData(() => {
                return {
                    city: data.name,
                    country: data.sys.country,
                    feels_like: data.main.feels_like,
                    icon: data.weather[0].icon,
                    temp: data.main.temp,
                    description: data.weather[0].description,
                }
            })
        }).catch(err => {
            if (err.response || err.request) {
                setData(() => {
                    return {
                        city: null,
                        country: null,
                        feels_like: null,
                        icon: null,
                        temp: null,
                    }
                })
            }
        });
    }

    const element = (
        <Gadget
            getCurrentLocation={getCurrentLocation}
            cityName={data.city}
            country={data.country}
            feels_like={data.feels_like}
            cityNameSearch={cityNameSearch}
            setCityNameSearch={setCityNameSearch}
            bySearch={bySearch}
            icon={data.icon}
            temp={data.temp}
            description={data.description}
        />
    )
    return element;
}

export default App;
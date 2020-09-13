import React, { useEffect, useState } from 'react';

import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current`, { params: { 'access_key': api_key, query: country } }).then(res => {
            const { current, location } = res.data
            setWeather({ ...current, ...location })
        })
    }, [country])

    return weather && <div>
        <h2>
            Weather in {country}
        </h2>
        <div><strong> temperature: </strong>{weather.temperature} Celsius</div>
        <div> <img src={weather.weather_icons[0]} alt="weather_icons" style={{ width: "120px" }} /> </div>
        <div><strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}  </div>
    </div>
}

export default Weather;




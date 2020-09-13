import React from 'react';

import Country from "./Country"
import Weather from "./Weather"

const Countries = ({ countries, showArr, showCountry }) => {

    if (countries.length > 10) return "Too many matches, specify another filter";

    if (countries.length === 1) return <> <Country country={countries[0]} ></Country><Weather country={countries[0].name} ></Weather></>

    return countries.map((country) => <div key={country.numericCode} >
        {showArr.find(e => e === country.name) ? <Country country={country} ></Country> : <div>{country.name} <button onClick={
            () => showCountry([...showArr, country.name])} >show</button></div>}
    </div>)
}

export default Countries;





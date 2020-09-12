import React, { useEffect, useState } from 'react';
import Country from "./Country"

const Countries = ({ countries, showArr, showCountry }) => {


    console.log(showArr);

    if (countries.length > 10) return "Too many matches, specify another filter";

    if (countries.length === 1) return <Country country={countries[0]} ></Country>

    return countries.map((country) => <div key={country.numericCode} >
        {showArr.find(e => e === country.name) ? <Country country={country} ></Country> : <div>{country.name} <button onClick={
            () => showCountry([...showArr, country.name])} >show</button></div>}
    </div>)
}

export default Countries;





import React, { useEffect, useState } from 'react';
import axios from "axios"

import Countries from "./components/Countries"

function App() {
  const [countries, setCountries] = useState([])
  const [showArr, setShowArr] = useState([])
  const [filterVal, setFilterVal] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      setCountries(res.data)
    })
  }, [])

  const handleValChange = e => { setFilterVal(e.target.value.toLowerCase().trim()); setShowArr([]) }


  return (
    <div className="App">
      find countries <input type="text" onChange={handleValChange} />
      <div>
        {filterVal && <Countries showArr={showArr} showCountry={setShowArr} countries={countries.filter(country => country.name.toLowerCase().includes(filterVal))} ></Countries>}
      </div>
    </div>
  );
}

export default App;

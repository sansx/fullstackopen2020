import React from 'react';

const Country = ({ country }) => {

    return <div>
        <h2>{country.name}</h2>
        <div> capital {country.capital} </div>
        <div> population {country.population} </div>
        <h2> languages </h2>
        <ul>
            {country.languages.map(lang => <li key={lang.name} >{lang.name}</li>)}
        </ul>
        <div>
            <img style={{width:"160px"}} src={country.flag} alt={country.name} />
        </div>
    </div>

}

export default Country;



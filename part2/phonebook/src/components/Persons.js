import React from 'react'

const Persons = ({ persons, filterVal }) => persons.filter((person) => filterVal ? person.name.toLowerCase().includes(filterVal.toLowerCase()) : true)
    .map((person, idx) => <div key={idx}>{person.name} {person.number}</div>)

export default Persons;



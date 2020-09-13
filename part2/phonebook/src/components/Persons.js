import React from 'react'

const Persons = ({ persons, filterVal, deleteFn }) => persons.filter((person) => filterVal ? person.name.toLowerCase().includes(filterVal.toLowerCase()) : true)
    .map((person, idx) => <div key={idx}>{person.name} {person.number}<button onClick={deleteFn.bind('', person)}>delete</button></div>)

export default Persons;



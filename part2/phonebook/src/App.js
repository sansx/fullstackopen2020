import React, { useState } from 'react'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  const submitFn = (e) => {
    e.preventDefault();
    
    persons.find(person => person.name === newName) ? 
    alert(`${newName} is already added to phonebook`) : 
    setPersons([...persons, { name: newName, number: newNumber }]);

    setNewName('')
    setNewNumber('')
  }

  const generateFn = fn => {
    return e => {
      fn(e.target.value)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={generateFn(setFilterVal)} ></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={submitFn} name={newName} nameChange={generateFn(setNewName)} 
      numberChange={generateFn(setNewNumber)} number={newNumber} ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} filterVal={filterVal} ></Persons>
    </div>
  )
}



export default App
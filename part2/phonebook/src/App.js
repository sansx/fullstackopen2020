import React, { useState, useEffect } from 'react'
import axios from "axios"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => setPersons(res.data))
  }, [])

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
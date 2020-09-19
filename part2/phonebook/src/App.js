import React, { useState, useEffect } from 'react'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notice from "./components/Notification"

import services from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [message, setMessage] = useState('')
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    services.getAll().then(res => setPersons(res))
  }, [])

  const submitFn = (e) => {
    e.preventDefault();

    persons.find(person => person.name === newName) ?
      updatePerson(persons.filter(person => person.name === newName)[0].id) :
      createPerson()
    setNewName('')
    setNewNumber('')
  }

  const generateFn = fn => {
    return e => {
      fn(e.target.value)
    }
  }

  const messageCountdown = (message, error = false, timeout = 3000) => {
    error ? setErrMessage(message) : setMessage(message);
    setTimeout(() => {
      error ? setErrMessage('') : setMessage('');
    }, timeout);
  }

  const updatePerson = (id) => {
    window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    ) && services.update(id, { name: newName, number: newNumber }).then(res => {
      let index = persons.findIndex(person => person.id === res.id);
      let copy = [...persons]
      copy.splice(index, 1, res)
      setPersons(copy)
      messageCountdown(`Updated ${res.name}'s number`)
    }).catch(err => {
      services.getAll().then(res => setPersons(res))
      // setPersons(persons.filter(person => person.id !== id))
      // messageCountdown(`Information of ${newName}  has already been removed from the server`, true)
      messageCountdown(err.response.data.error, true)
    })
  }

  const createPerson = () => {
    // setPersons([...persons, { name: newName, number: newNumber }]);
    services.create({ name: newName, number: newNumber }).then(res => {
      setPersons([...persons, res])
      messageCountdown(`Added ${res.name}`)
    }).catch(err => {
      messageCountdown(err.response.data.error, true)
    })
  }

  const removePerson = person => {
    window.confirm(`Delete ${person.name} ?`) && services.deletePerson(person.id).then(res => {
      setPersons(persons.filter(el => el.id !== person.id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notice message={message} ></Notice>}
      {errMessage && <Notice message={errMessage} error={true} ></Notice>}
      <Filter onChange={generateFn(setFilterVal)} ></Filter>
      <h3>add a new</h3>
      <PersonForm onSubmit={submitFn} name={newName} nameChange={generateFn(setNewName)}
        numberChange={generateFn(setNewNumber)} number={newNumber} ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} filterVal={filterVal} deleteFn={removePerson} ></Persons>
    </div>
  )
}

export default App
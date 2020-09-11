import React from 'react'

const Total = ({ parts }) => <h4>total of {parts.reduce((a, b) => (a.exercises || a) + b.exercises)} exercises </h4>

export default Total
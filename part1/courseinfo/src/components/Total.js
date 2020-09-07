import React from 'react'

const Total = ({ parts }) => <p>Number of exercises {parts.reduce((a, b) => (a.exercises || a) + b.exercises)}</p>

export default Total
import React from 'react'
import Part from "./Part"

const Content = ({ parts }) => <div>{parts.map((e, index) => <Part key={index} data={e} />)}</div>

export default Content
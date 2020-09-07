import React from 'react'
import Part from "./Part"

const Content = ({ parts }) => <div>{parts.map(e => <Part key={e.id} data={e} />)}</div>

export default Content
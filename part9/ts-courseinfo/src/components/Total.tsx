import React from "react";
import { course } from "../types"


const Total: React.FC<{ parts: course[] }> = ({ parts }) => <p>
  Number of exercises{" "}
  {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
</p>

export default Total;

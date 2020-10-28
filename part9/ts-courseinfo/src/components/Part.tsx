import React from "react";
import { CoursePart } from "../types"

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const extraInfo = () => {
    switch (part.name) {
      case "Fundamentals":
        return <p>description: {part.description}</p>
      case "Using props to pass data":
        return <p>
          groupProjectCount :  {part.groupProjectCount}
        </p>
      case "Deeper type usage":
        return <>
          <p>description: {part.description}</p>
          <p>
            exerciseSubmissionLink :  {part.exerciseSubmissionLink}
          </p> </>
      case 'MyCourse':
        return <>
          <p>description: {part.description}</p>
          <p>
            duration :  {part.duration}
          </p>
        </>
      default:
        return assertNever(part);
    }
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return <div>
    <p >
      {part.name}
    </p>
    <p>
      exerciseCount: {part.exerciseCount}
    </p>
    {extraInfo()}
  </div>
}

export default Part;





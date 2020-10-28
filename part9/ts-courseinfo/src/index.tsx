import React from "react";
import ReactDOM from "react-dom";

import { CoursePart } from './types'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: 'MyCourse',
      duration: 20,
      exerciseCount: 16,
      description: "Do the necessary changes to Content, so that all attributes for the new course part also get rendered and that the compiler doesn't produce any errors."
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} ></Content>
      <Total parts={courseParts}  ></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
export interface course {
  name: string,
  exerciseCount: number
}

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface BaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends BaseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends BaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface MyCourse {
  name: 'MyCourse',
  duration: number,
  exerciseCount: number,
  description: string
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCourse;

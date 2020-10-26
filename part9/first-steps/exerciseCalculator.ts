interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hoursArr: number[],
  target: number
): Result => {

  const periodLength = hoursArr.length;
  const trainingDays = hoursArr.filter((hour) => hour > 0).length;
  const average = hoursArr.reduce((a, b) => a + b, 0) / periodLength;

  const obj: Result = {
    periodLength,
    trainingDays,
    success: average >= target,
    rating: 1,
    ratingDescription: 'need more effort',
    target,
    average,
  };

  switch (true) {
    case average >= target:
      obj.rating = 3;
      obj.ratingDescription = 'you did a great achievement';
      break;
    case Math.round(average) === target:
      obj.rating = 2;
      obj.ratingDescription = 'not too bad but could be better';
      break;
  }

  return obj;
};

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , ...testArr] = args;

  if (testArr.every(e => !isNaN(Number(e)))) {
    return testArr.map(e => Number(e));
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (require.main === module) {
  try {
    const [target, ...hoursArr] = parseArguments(process.argv);
    console.log(calculateExercises(hoursArr, target));
  } catch ({ message }) {
    console.log('Error, something bad happened, message: ', message);
  }
}

export default calculateExercises;



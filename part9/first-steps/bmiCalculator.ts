

export const calculateBmi = (hieght: number, weight: number): string => {
  const bmi = weight / Math.pow(hieght / 100, 2);
  const resArr = ["Obese Class III (Very severely obese)",
    "Obese Class II (Severely obese)",
    "Obese Class I (Moderately obese)",
    "Overweight", "Normal (healthy weight)",
    "Underweight", "Severely underweight"];
  let res = "Very severely underweight";
  const checkArr = [40, 35, 30, 25, 18.5, 16, 15];

  for (let idx = 0; idx < checkArr.length; idx++) {
    if (bmi >= checkArr[idx]) return res = resArr[idx];
  }

  return res;
};

interface BmiVal {
  hieght: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiVal => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      hieght: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (require.main === module) {
  try {
    const { hieght, weight } = parseArguments(process.argv);
    console.log(calculateBmi(hieght, weight));
  } catch ({ message }) {
    console.log('Error, something bad happened, message: ', message);
  }
}


export default calculateBmi;

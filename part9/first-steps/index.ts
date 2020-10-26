import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { Request } from 'express';
const app = express();
app.use(express.json());

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || isNaN(Number(height))) return res.status(400).send({
    error: 'need heigh params'
  });
  if (!weight || isNaN(Number(weight))) return res.status(400).send({
    error: 'need weight params'
  });

  try {
    return res.send({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } catch (err) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }
});

type resBody = {
  daily_exercises: number[],
  target: number
};

app.post('/exercises', (req: Request<unknown, unknown, resBody>, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: "parameters missing"
    })
  }
  if ([...daily_exercises, target].find(e => isNaN(Number(e)))) {
    return res.status(400).send({
      error: "malformatted parameters"
    })
  }

  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
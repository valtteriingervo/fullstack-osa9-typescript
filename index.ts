import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
// We need to use the express.json() middleware if we want to parse JSON requests
// of the VS Code REST client
app.use(express.json());

// Waypoint for the BMI Calculator
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (height && weight) {
    const obj = {
      weight,
      height,
      bmi: bmiCalculator(height, weight)
    };
    res.json(obj);
  }
  else {
    res.json({ error: 'malformatted parameters' });
  }
});

// Waypoint for the Exercise Calculator
app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Check that both parameters are in the body with a value
  // eslint-disable-next-line
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  // Check that daily_exercises is typeof Array
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  // Check that parameters contain only numbers
  // eslint-disable-next-line
  const checkForNaN = daily_exercises.filter(n => isNaN(n))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || checkForNaN.length > 0) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  // We now know that daily_exercises is type number[] and target is type number
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(calculateExercises(daily_exercises, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
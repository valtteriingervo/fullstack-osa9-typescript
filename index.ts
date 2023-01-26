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
// TO-DO: Add error handling and parameter validation
app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  console.log(daily_exercises);
  console.log(target);

  // TO-DO: Can we get rid of the ESlint disable rule below
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(daily_exercises, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
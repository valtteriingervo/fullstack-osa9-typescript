import express from 'express';
import { bmiCalculator } from './bmiCalculator'

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  if (height && weight) {
    const obj = {
      weight,
      height,
      bmi: bmiCalculator(height, weight)
    }
    res.json(obj)
  }
  else {
    res.json({ error: 'malformatted parameters' })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
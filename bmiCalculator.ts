// Ranges according to Hospital Authority of Hong Kong
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)
  if (bmi < 18.5) {
    return 'Undeweight (Unhealthy)'
  } else if (18.5 <= bmi && bmi <= 22.9) {
    return 'Normal range (Healthy)'
  } else if (23.0 <= bmi && bmi <= 24.9) {
    return 'Overweight I (At risk)'
  } else if (25.0 <= bmi && bmi <= 29.9) {
    return 'Overweight II (Moderately obese)'
  } else {
    return 'Overweight III (Severy obese)'
  }
}

console.log(calculateBmi(220, 70))
console.log(calculateBmi(180, 70))
console.log(calculateBmi(160, 120))
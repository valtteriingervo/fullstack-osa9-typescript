interface HeightAndWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

// Ranges according to Hospital Authority of Hong Kong
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)
  console.log('BMI', bmi)
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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

// Let TS know that this is a module
// and avoid adding this files declarations to the global scope
export { }
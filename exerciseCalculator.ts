interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (trainingHours: Array<Number>, target: number): Result => {
  // Period length is simply the array size
  const periodLength = trainingHours.length
  // Filter out days that have 0 training hours
  const trainingDays = trainingHours.filter(hours => hours != 0).length

  const sumHours: Number = trainingHours.reduce((a: number, b: number) => a + b, 0)
  // Use valueOf() to change Number wrapper type to the primitive number type
  const average = (sumHours.valueOf() / periodLength) || 0
  const success: boolean = average >= target

  const diffBetweenTarget: number = average - target

  let rating: number
  if (diffBetweenTarget > 0.5) {
    rating = 3
  } else if (diffBetweenTarget <= 0.5 && diffBetweenTarget >= -0.5) {
    rating = 2
  } else {
    rating = 1
  }

  interface ratingDescType {
    [key: number]: string
  }

  const ratingDescDict: ratingDescType = {
    3: 'Great job! You\'ve exceeded yourself!',
    2: 'Good stuff! You are very close to your target',
    1: 'A bit below target but you\'ll do better next training period!'
  }

  const ratingDescription: string = ratingDescDict[rating]

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}


const parseArguments = (args: Array<string>): Array<number> => {
  // npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
  // arg[0] => run
  // arg[1] => calculateExercises
  // arg[2] => 2 (the target)
  // arg[3 ...] => 1 0 2 4.5 0 3 1 0 4 (the training hours per day)
  if (args.length < 3) throw new Error('No target hours or training hours per day provided');
  if (args.length < 4) throw new Error('Only target hours provided. Give also the training hours per day.');
  if (args.length < 5) throw new Error('Training period must be longer than one day');

  const nonNumberArgs = args.slice(2).filter(arg => isNaN(Number(arg)))

  if (nonNumberArgs.length <= 0) {
    // Remove the first two arguments "run" and "calculatedExercises" and map the input strings to numbers
    return args.slice(2).map(arg => Number(arg))
  } else {
    throw new Error('One ore more of the provided values were not numbers!');
  }
}

try {
  const targetAndTrainingHours = parseArguments(process.argv);
  const target = targetAndTrainingHours[0]
  const trainingHours = targetAndTrainingHours.slice(1)

  console.log(calculateExercises(trainingHours, target))
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


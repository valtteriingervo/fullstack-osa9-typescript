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

// Model input from 9.1
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
// Very low high target
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 10))
// Very low target
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 0.2))


/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Ignore the rules for exercise 9.12
// We will set up parsing and enable the rules again in 9.13

import { NewPatientEntry } from "./types";

const toNewPatientEntry = (object: any): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing patient data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object) {
    const newPatient: NewPatientEntry = {
      name: object.name,
      dateOfBirth: object.dateOfBirth,
      ssn: object.ssn,
      gender: object.gender,
      occupation: object.occupation
    };

    return newPatient;
  }

  throw new Error('Incorrect data: one or more patient fields missing!');

};

export default toNewPatientEntry;
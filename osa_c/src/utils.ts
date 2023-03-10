import { NewPatientEntry, Gender, Entry } from "./types";

// All the isX functions
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// assert that param is one of the Gender enums
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// All the parseX functions
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing patient ssn');
  }

  return ssn;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing patient name');
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing patient occupation');
  }

  return occupation;
};

// Check that a potential entry has one of the entry types
// (Enough for exercise 9.22)
const isEntry = (entry: unknown): entry is Entry => {
  // Check that entry is an object
  if (!entry || typeof entry !== 'object') {
    return false;
  }
  // Check that entry has field of 'type'
  if ('type' in entry && isString(entry.type)) {
    // Check that type of entry matches one of the three possible ones
    ["Hospital, OccupationalHealthcare, HealthCheck"].includes(entry.type);
    return true;
  }
  return false;

};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect or missing patient entry data');
  }
  const isEntryArray
    = entries.map(entry => isEntry(entry));
  if (isEntryArray.includes(false)) {
    throw new Error('Incorrect or missing patient entry data');
  }
  // We can now safely assert entries as type Entry[]
  return entries as Entry[];
};

// Final patient entry parser function
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing patient data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      // We will remove the type assertion during the next exercises
      entries: parseEntries(object.entries)
    };

    return newPatient;
  }

  throw new Error('Incorrect data: one or more patient fields missing!');

};

export default toNewPatientEntry;
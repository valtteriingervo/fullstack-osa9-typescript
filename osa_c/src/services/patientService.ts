import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { PatientNoSSN, NewPatientEntry, Patient } from "../types";

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// We will return a Patient, giving the NewPatientEntry type an id field
const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsNoSSN,
  addPatient
};
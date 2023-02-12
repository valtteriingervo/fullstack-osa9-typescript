export interface Diagnose {
  code: string;
  name: string;
  latin?: string; // Not all entries have the latin version of diagnosis
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientNoSSN = Omit<Patient, 'ssn'>;
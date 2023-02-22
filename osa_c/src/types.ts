export interface Diagnose {
  code: string;
  name: string;
  latin?: string; // Not all entries have the latin version of diagnosis
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientNoSSN = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
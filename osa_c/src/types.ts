export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string; // Not all entries have the latin version of diagnosis
}
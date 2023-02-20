// We don't need to worry about weather and visibility enums
// as the data from axio.get command is typed correctly by the backend and
// we'll use the radio buttons to add new weather and visibility data
export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllDiaryEntries = () => {
  return axios
    .get<DiaryEntry[]>('http://localhost:3001/api/diaries')
    .then(response => response.data)
}

export const createDiaryEntry = (object: NewDiaryEntry) => {
  // The backend will give the diary entry an ID and turn in into DiaryEntry type
  return axios
    .post<DiaryEntry>('http://localhost:3001/api/diaries', object)
    .then(response => response.data)
}
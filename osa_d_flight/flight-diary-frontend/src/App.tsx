import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries } from './diaryService';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <div>
      <h1>Diary entries</h1>
      <ul>
        <p>
          {diaryEntries.map(diaryEntry => <li key={diaryEntry.id}>
            <b>{diaryEntry.date}</b>
            <br></br>
            {"Visibility: "} {diaryEntry.visibility}
            <br></br>
            {"Weather: "} {diaryEntry.weather}
            <br></br>
            <i>{"Comments: "} {diaryEntry.comment}</i>
            <br></br>
          </li>)}
        </p>
      </ul>
    </div>
  )
}

export default App;
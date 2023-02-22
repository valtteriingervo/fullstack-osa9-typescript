import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiaryEntry({
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }).then(data => {
      setDiaryEntries(diaryEntries.concat(data))
    })

    setNewDate('')
    setNewVisibility('')
    setNewWeather('')
    setNewComment('')
  };

  return (
    <div>
      <h1>Diary entries</h1>
      <div>
        <form onSubmit={diaryEntryCreation}>
          date: <input
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
          <br></br>
          visibility: <input
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)}
          />
          <br></br>
          weather: <input
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)}
          />
          <br></br>
          comment: <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <br></br>
          <button type='submit'>add</button>
        </form>
      </div>
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
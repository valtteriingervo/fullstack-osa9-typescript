import axios from 'axios';
import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  const errorStyle = {
    color: 'red',
    fontSize: 22
  }

  return (
    <div style={errorStyle}>
      <p>{errorMessage}</p>
    </div>
  )
}

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const [errorMsg, setNewErrorMsg] = useState('');

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

      setNewDate('')
      setNewVisibility('')
      setNewWeather('')
      setNewComment('')
    })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setNewErrorMsg(error.response?.data)
          setTimeout(() => { setNewErrorMsg('') }, 5000)
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <h1>Diary entries</h1>
      <ErrorMessage errorMessage={errorMsg} />
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
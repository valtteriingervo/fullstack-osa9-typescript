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
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
          <br></br>
          <div></div>
          <div>
            visibility:
            great    <input type="radio" name="visibility"
              onChange={() => setNewVisibility('great')} />
            good    <input type="radio" name="visibility"
              onChange={() => setNewVisibility('good')} />
            ok <input type="radio" name="visibility"
              onChange={() => setNewVisibility('ok')} />
            poor <input type="radio" name="visibility"
              onChange={() => setNewVisibility('poor')} />
          </div>
          <br></br>
          <div>
            weather:
            sunny     <input type="radio" name="weather"
              onChange={() => setNewWeather('sunny')} />
            rainy    <input type="radio" name="weather"
              onChange={() => setNewWeather('rainy')} />
            cloudy <input type="radio" name="weather"
              onChange={() => setNewWeather('clody')} />
            stormy <input type="radio" name="weather"
              onChange={() => setNewWeather('stormy')} />
            windy <input type="radio" name="weather"
              onChange={() => setNewWeather('windy')} />
          </div>
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
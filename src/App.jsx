import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [note, setNote] = useState("");
  useEffect (() => {
    const savedNote = localStorage.getItem("myNote");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);
  useEffect (() => {
    localStorage.setItem("myNote", note);
  }, [note]);
return(
  <div>
    <h1>ノートアプリ</h1>
    <textarea
      value={note}
      onChange={(e)=> setNote(e.target.value)}
    />
  </div>
)
} 



export default App

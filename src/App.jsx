import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [notes, setNotes] = useState([]);

  //ページ読み込み時にlocalStrageから復元
  useEffect (() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  //notesが変わるたびにlocalStrageに保存
  useEffect (() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //新しいノートを追加
  const addNote = () => {
    if (title.trim() === "" && content.trim() === "") return;
    const newNote = {title, content};
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  }

  return(
    <div>
      <h1>ノートアプリ</h1>

      <div>
        <input
          type="text"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
        />
        <textarea
          placeholder="テキストを入力"
          value={content}
          onChange={(e)=> setContent(e.target.value)}
        />
        <button onClick={addNote}>保存</button>
      </div>

      <h2>保存されたノート</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default App

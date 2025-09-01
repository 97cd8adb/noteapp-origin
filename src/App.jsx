import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null)

  //ページ読み込み時にlocalStrageから復元
  useEffect (() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  //notesが変わるたびにlocalStrageに保存
  useEffect (() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  },[notes]);

  //新しいノートを追加
  const addNote = () => {
    const newNote = { title, content };
    setNotes([...notes, newNote]);
    setSelectedIndex(notes.length);
    setTitle("")
    setContent("")
  }

  return(
    <div>
      <p>ノートアプリ</p>
      <div>
        <div>
          <input
            type="text"
            placeholder="タイトルを入力"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="テキストを入力"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
          />
        </div>
        <div>
          <button onClick={addNote}>保存</button>
        </div>
      </div>
      <div>
        <p>保存されたノート一覧</p>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <p>{note.title || " （無題） "}</p>
              <p>
                {note.content.length>100 
                  ? note.content.substring(0, 100) + "..."
                  : note.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



export default App

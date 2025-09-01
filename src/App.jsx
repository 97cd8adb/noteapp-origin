import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
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
    const newNote = { title:"", content:"" };
    setNotes([...notes, newNote]);
    setSelectedIndex(notes.length);
  };

  //ノートを更新
  const updateNote = (index, field, value) => {
    const updateNotes = [...notes];
    updateNotes[index][field] = value;
    setNotes(updateNotes);
  }

  //ノート選択
  const selectedNote = selectedIndex !== null ? notes[selectedIndex] : null;

  return(
    <div>
      <p>ノートアプリ</p>
      <div>
        <button onClick={addNote}>追加</button>
      </div>

      {selectedNote && (
        <div>
          <div>
            <input
              type="text"
              placeholder="タイトルを入力"
              value={selectedNote.title}
              onChange={(e) => updateNote(selectedIndex, "title", e.target.value)}
            />
            <div>
              <textarea
                placeholder="入力してください"
                value={selectedNote.content}
                onChange={(e) => updateNote(selectedIndex, "content", e.target.value)}
              />
            </div>
          </div>
          <div>
            <h1>プレビュー</h1>
            <p>{selectedNote.title || "タイトル未入力です"}</p>
            <p>{selectedNote.content || "内容未入力"}</p>
          </div>
        </div>
      )}

      <div>
        <ul>
          {notes.map((note, index) =>
            <li
            key={index}
            onClick={() => setSelectedIndex(index)}
            >
              {note.title || "タイトル無し"}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};



export default App

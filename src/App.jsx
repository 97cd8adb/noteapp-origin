import { useEffect, useState } from 'react'
import './App.css'
import ReactMarkdown from 'react-markdown';

  
const App = () => {
  //ページ読み込み時にlocalStrageから復元
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : []
  });
  const [selectedIndex, setSelectedIndex] = useState(null)

  //notesが変わるたびにlocalStrageに保存
  useEffect (() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  },[notes]);

  //新しいノートを追加
  const addNote = () => {
    const newNote = { title:"", content:"", updatedAt:new Date() };
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

  //ノート削除
  const deleteNote = (index) => {
    if(window.confirm("このノートを削除しますか？")){
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes)
    setSelectedIndex(null);
    };
  };

  return(
    <div className="app">
      <div className="sidebar">
        <button
          className="add-button"
          onClick={addNote}>ノートを追加する
        </button>
        <ul className="note-list">
          {notes.map((note, index) =>
            <li
              key={index}
              className={`note-item ${selectedIndex === index ? "active" : ""}`}
              onClick={() => setSelectedIndex(index)}
            >
            <span>
              {note.title || "タイトル無し"}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteNote(index)}
            >削除
            </button>  
            </li>
          )}
        </ul>
      </div>

      <div className="editor-preview">
        {selectedNote && (
          <>
            <div className="editor">
              <input
                className="title-input"
                type="text"
                placeholder="タイトルを入力"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedIndex, "title", e.target.value)}
              />
              <textarea
                className="content-textarea"
                placeholder="入力してください"
                value={selectedNote.content}
                onChange={(e) => updateNote(selectedIndex, "content", e.target.value)}
              />
            </div>
            <div className="preview">
              <h1>{selectedNote.title}</h1>
              <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};



export default App

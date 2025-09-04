import { useEffect, useRef, useState } from 'react'
import './App.css'
import Markdown from 'react-markdown';

  
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
    updateNotes[index].updatedAt = new Date();//←日時も更新
    setNotes(updateNotes);
  };

  //ノートを更新順にソートx
  const sortedNotes =[...notes].sort((a, b) => {
    const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return timeB - timeA
  })

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

  //追加したノートへフォーカスする
  const titleInputRef = useRef(null);
  useEffect (() => {
    if(selectedNote && titleInputRef.current ) {
      titleInputRef.current.focus();
    }
  }, [selectedIndex])


  return(
    <div className="app">
      <div className="sidebar">
        <button
          className="add-button"
          onClick={addNote}>ノートを追加する
        </button>
        <ul className="note-list">
          {sortedNotes.map((note)=> {
            const originalIndex = notes.findIndex( n => n === note);
            return(
            <li
              key={originalIndex}
              className={`note-item ${selectedIndex === originalIndex ? "active" : ""}`}
              onClick={() => setSelectedIndex(originalIndex)}
            >
            <span>
              {note.title || "タイトル無し"}
              <br />
              <small>{note.updatedAt ? new Date(note.updatedAt).toLocaleString() : ""}</small>
            </span>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(originalIndex);
              }}
            >削除
            </button>  
            </li>
            );
          })}
        </ul>
      </div>

      <div className="editor-preview">
        {selectedNote && (
          <>
            <div className="editor">
              <input
                ref={titleInputRef}
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
              <Markdown>{selectedNote.content}</Markdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};



export default App

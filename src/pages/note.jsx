import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "../css/note.css";

function Note() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    const newNote = {
      id: nanoid(),
      color: getRandomColor(),
      text: "",
    };
    setNotes([...notes, newNote]);
  }

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  function getRandomColor() {
    const colors = [
      "bg-pink",
      "bg-purple",
      "bg-blue",
      "bg-green",
      "bg-yellow",
      "bg-red",
      "bg-indigo",
      "bg-gray",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  function adjustTextareaHeight(event, index) {
    const textarea = event.target;
    textarea.style.height = "auto";
    const computedHeight = Math.min(textarea.scrollHeight, 300); // Limit to 300px
    textarea.style.height = `${computedHeight}px`;

    const updatedNotes = [...notes];
    updatedNotes[index].text = textarea.value;
    setNotes(updatedNotes);
  }
  // clear all notes
  const clearAll = () => {
    setNotes([]);
  };
  return (
    <div className="container" style={{ minHeight: "90vh" }}>
      <div className="note-container">
        <div className="notes">
          <h1>Notes</h1>
          <p>
            You can add notes by clicking this green button, the notes will
            automaticly saved. You can also delete the notes one by one by
            clicking the trash icon in each note or just clear all the notes by
            clicking the red button below.
          </p>
          <div>
            <button className="button bg-green" onClick={() => addNote()}>
              <i className="fa fa-solid fa-plus button-font">
                <p>New Note</p>
              </i>
            </button>
            <button className="button bg-red" onClick={() => clearAll()}>
              <i className="fa fa-solid fa-trash button-font">
                <p>Clear Notes</p>
              </i>
            </button>
          </div>
        </div>
        <div>
          <div className="notes">
            <h1>Note List</h1>
          </div>
          {notes.length === 0 ? (
            <p className="notes">Tidak ada data</p>
          ) : (
            <div>
              {notes.map((note, index) => (
                <div key={index} className={`${note.color} `} style={{borderRadius: 6+"px", padding: .4+"rem", marginBottom: 10+"px"}}>
                  <div className="form-note">
                    <textarea
                      value={note.text}
                      className="textarea-notes"
                      onChange={(e) => {
                        const updatedNotes = [...notes];
                        updatedNotes[index].text = e.target.value;
                        setNotes(updatedNotes);
                        adjustTextareaHeight(e, index);
                      }}
                      placeholder="Write your note here..."
                    ></textarea>
                    <div>
                      <button onClick={() => deleteNote(index)} className="button-delete-note">
                        <i className="fa fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;

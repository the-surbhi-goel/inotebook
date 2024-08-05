import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "../Notes/AddNote";
import UpdateNote from "./UpdateNote";

const VIEWS = {
  LIST: "LIST",
  ADD: "ADD",
  UPDATE: "UPDATE",
};

export default function NotesList() {
  const context = useContext(NoteContext);
  const { notes, getNoteList } = context;
  const [view, setView] = useState(VIEWS.LIST);
  const [editNote, setEditNote] = useState(null);

  const updateNote = (note) => {
    console.log("note ", note);
    setView(VIEWS.UPDATE);
    setEditNote(note);
  };

  useEffect(() => {
    getNoteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {view === VIEWS.ADD && <AddNote setView={setView} />}

      {view === VIEWS.UPDATE && <UpdateNote note={editNote} setView={setView} />}

      {view === VIEWS.LIST && (
        <div className="row my-3">
          <div className="d-flex justify-content-between">
            <h2>Your notes</h2>
            <i
              className="fa-solid fa-plus"
              onClick={() => {
                setView(VIEWS.ADD);
              }}
            ></i>
          </div>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
          })}
        </div>
      )}
    </>
  );
}

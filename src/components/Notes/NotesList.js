import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "../Notes/AddNote";
import UpdateNote from "./UpdateNote";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

const VIEWS = {
  LIST: "LIST",
  ADD: "ADD",
  UPDATE: "UPDATE",
};

export default function NotesList() {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { notes, getNoteList } = context;
  const [view, setView] = useState(VIEWS.LIST);
  const [editNote, setEditNote] = useState(null);

  const updateNote = (note) => {
    setView(VIEWS.UPDATE);
    setEditNote(note);
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      getNoteList();
    }
    else{
      navigate(PATH.login, {replace: true})
    }
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

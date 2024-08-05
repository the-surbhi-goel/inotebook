import React, { useContext, useEffect } from "react";
import NoteContext from "../../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "../Notes/AddNote";

export default function NotesList() {
  const context = useContext(NoteContext);
  const { notes, getNoteList } = context;

  useEffect(() => {
    getNoteList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

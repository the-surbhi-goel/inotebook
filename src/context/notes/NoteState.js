import { useState } from "react";
import NoteContext from "./NoteContext";
import APIS from "../../constants/api";

const NoteState = (props) => {
  const notesList = [];

  const [notes, setNotes] = useState(notesList);

  const getNoteList = async () => {
    try {
      const response = await fetch(APIS.note.getNotesList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await fetch(APIS.note.addNote, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "",
        },
        body: JSON.stringify(note),
      });
      console.log("response ", response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      if (json.status === "OK") {
        setNotes(notes.concat(json.note));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const editNote = (noteId, note) => {};

  const deleteNote = async (noteId) => {
    console.log("noteId ", noteId);

    try {
      const response = await fetch(APIS.note.deleteNote + noteId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "",
        },
      });
      console.log("response ", response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      if (json.status === "OK") {
        const newNotesList = notes.filter((note) => note._id !== noteId);
        setNotes(newNotesList);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNoteList, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

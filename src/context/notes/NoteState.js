import { useState } from "react";
import NoteContext from "./NoteContext";
import APIS from "../../constants/api";

const NoteState = (props) => {
  const notesList = [];

  const [notes, setNotes] = useState(notesList);
  const token = localStorage.getItem("token");

  const getNoteList = async () => {
    try {
      const response = await fetch(APIS.note.getNotesList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
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
          "auth-token": token,
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (json.status === "OK") {
        setNotes(notes.concat(json.note));
      }
      return;
    } catch (error) {
      console.error(error.message);
    }
  };

  const editNote = async (noteId, note) => {
    try {
      const response = await fetch(APIS.note.updateNote + noteId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (json.status === "OK") {
        const i = notes.findIndex((note) => note._id === noteId);
        let newList = [...notes];
        newList[i] = json.note;
        setNotes(newList);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(APIS.note.deleteNote + noteId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
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

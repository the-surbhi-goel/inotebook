import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    await addNote({ ...note, _id: note.title });
    props.setView("LIST");
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form className="my-3" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            onChange={onChange}
            minLength={3}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            onChange={onChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            props.setView("LIST");
          }}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary mx-3">
          Add Note
        </button>
      </form>
    </div>
  );
}

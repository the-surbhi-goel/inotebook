import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";

export default function UpdateNote(props) {

    const context = useContext(NoteContext);
    const { editNote } = context;
    const [note, setNote] = useState(JSON.parse(JSON.stringify(props.note)));
  
    const submitForm = async (e) => {
      e.preventDefault();
      console.log("note ", note);
      await editNote(note._id, { ...note, _id: note.title });
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
        <h2>Edit note</h2>
        <form className="my-3" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              placeholder="Enter title"
              onChange={onChange}
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
              value={note.description}
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
              value={note.tag}
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
            Update Note
          </button>
        </form>
      </div>
    );
  }

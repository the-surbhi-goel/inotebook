import React, { useContext } from "react";
import NoteContext from "../../context/notes/NoteContext";
import "./Notes.css";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i className="fa-solid fa-file-pen"></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

const baseURL = "http://localhost:8000/";

const APIS = {
  note: {
    getNotesList: `${baseURL}api/notes/get-notes-list`,
    addNote: `${baseURL}api/notes/add-note`,
    updateNote: `${baseURL}api/notes/update-note/`,
    deleteNote: `${baseURL}api/notes/delete-note/`,
  },
};

Object.freeze(APIS);

export default APIS;

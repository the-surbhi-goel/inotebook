const baseURL = "http://localhost:8000/";

const APIS = {
  note: {
    getNotesList: `${baseURL}api/notes/get-notes-list`,
    addNote: `${baseURL}api/notes/add-note`,
    updateNote: `${baseURL}api/notes/update-note/`,
    deleteNote: `${baseURL}api/notes/delete-note/`,
  },
  auth: {
    login: `${baseURL}api/auth/login`,
    signUp: `${baseURL}api/auth/signup`
  }
};

Object.freeze(APIS);

export default APIS;

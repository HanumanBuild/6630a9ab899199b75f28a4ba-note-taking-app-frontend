import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await axios.get(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes`);
      setNotes(result.data);
    };
    fetchNotes();
  }, []);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
  };

  const deleteNote = async (id) => {
    await axios.delete(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <div>
      <NoteForm addNote={addNote} selectedNote={selectedNote} updateNote={updateNote} />
      <NoteList notes={notes} selectNote={selectNote} deleteNote={deleteNote} />
    </div>
  );
}

export default App;
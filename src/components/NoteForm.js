import React, { useState } from 'react';
import axios from 'axios';

function NoteForm({ addNote, selectedNote, updateNote }) {
  const [note, setNote] = useState(selectedNote || { title: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note._id) {
      const updatedNote = await axios.patch(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes/${note._id}`, note);
      updateNote(updatedNote.data);
    } else {
      const newNote = await axios.post(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes`, note);
      addNote(newNote.data);
    }
    setNote({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Title" value={note.title} onChange={handleChange} />
      <textarea name="content" placeholder="Content" value={note.content} onChange={handleChange}></textarea>
      <button type="submit">{note._id ? 'Update' : 'Save'}</button>
    </form>
  );
}

export default NoteForm;
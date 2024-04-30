import React from 'react';

function NoteList({ notes, selectNote, deleteNote }) {
  return (
    <ul>
      {notes.map(note => (
        <li key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => selectNote(note)}>Edit</button>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import NoteCard from '../components/NoteCard';
export default function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNotes(data.reverse());
      });
  }, []);
  const deleteNote = (id) => {
    const oldNotes = notes;
    setNotes(notes.filter((note) => note.id !== id));
    fetch('http://localhost:8000/notes/' + id, { method: 'DELETE' });
  };
  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} deleteNote={deleteNote} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

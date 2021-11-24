import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import NoteCard from '../components/NoteCard';
import { useHistory } from 'react-router';
export default function Notes({ notes, removeNote }) {
  const history = useHistory();
  notes.sort((a, b) => {
    return b.id - a.id;
  });
  if (notes.length === 0) {
    return (
      <Container>
        <Typography variant='h1' sx={{ textAlign: 'center' }}>
          No Notes ..
        </Typography>
        <Button
          sx={{ margin: ' 0 auto', display: 'block', marginTop: '50px' }}
          variant='contained'
          onClick={() => {
            history.push('/create');
          }}
        >
          ADD SOME
        </Button>
      </Container>
    );
  }
  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} deleteNote={removeNote} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

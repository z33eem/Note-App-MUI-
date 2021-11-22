import React from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const NoteCard = ({ note, deleteNote }) => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton
            onClick={(e) => {
              deleteNote(note.id);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary'>
          {note.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;

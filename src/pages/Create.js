import React, { useState } from 'react';
import {
  Typography,
  Container,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import { useHistory } from 'react-router';
const useStyles = makeStyles({
  field: {
    marginBottom: '10px !important',
    marginTop: '10px !important',
    display: 'block !important',
  },
});
export default function Create({ addNote }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [category, setCategory] = useState('todods');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDescriptionError(false);
    if (title == '') {
      setTitleError(true);
    }
    if (description == '') {
      setDescriptionError(true);
    }
    if (title && description) {
      addNote(title, description, category, new Date().valueOf());
      history.push('/');
    }
  };
  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label='Title'
          variant='outlined'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          error={titleError}
          fullWidth
          autoFocus
        />
        <TextField
          className={classes.field}
          label='Description'
          variant='outlined'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          error={descriptionError}
          fullWidth
          multiline
          rows={4}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <FormControlLabel
              value='todods'
              control={<Radio />}
              label='Todos'
            />
            <FormControlLabel
              value='memory'
              control={<Radio />}
              label='Memory'
            />
            <FormControlLabel
              value='reminder'
              control={<Radio />}
              label='Reminder'
            />
          </RadioGroup>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disableElevation
          endIcon={<SendIcon />}
        >
          Add
        </Button>
      </form>
    </Container>
  );
}

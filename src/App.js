import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import Layout from './components/Layout';

function App() {
  const [notes, setNotes] = useState([]);
  const addNote = (title, description, category, id) => {
    setNotes((notes) => {
      return [...notes, { title, description, category, id }];
    });
  };
  const removeNote = (id) => {
    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });
  };
  useEffect(() => {
    if (localStorage.getItem('notes')) {
      setNotes(JSON.parse(localStorage.getItem('notes')));
    } else {
      localStorage.setItem('notes', notes);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Notes notes={notes} removeNote={removeNote} />
          </Route>
          <Route path='/create'>
            <Create addNote={addNote} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

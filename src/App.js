import React from 'react';
import { makeStyles } from '@material-ui/core';

import ImageEditor from './ImageEditor';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '90vw',
    height: '90vh',
    position: 'relative',
    zIndex: 2
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageEditor />
    </div>
  );
}

export default App;
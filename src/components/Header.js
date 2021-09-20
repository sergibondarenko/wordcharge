import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { AuthNav } from './AuthNav';

const useStyles = makeStyles({
  app_header: {
    marginBottom: '32px'
  },
});

export function Header() {
  const classes = useStyles();  

  return (
    <div className={classes.app_header}>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <Typography variant="h1">Wordcharge</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Create cards of words from a text. Use the cards to learn languages.
          </Typography>
        </Grid>
        <Grid item>
          <AuthNav />
        </Grid>
      </Grid>
    </div>
  );
}
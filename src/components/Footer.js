import React from 'react';
import { Grid, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Email as EmailIcon, GitHub as GitHubIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  app_footer: {
    position: 'relative',
    bottom: 0,
    marginTop: '32px'
  },
});

export function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.app_footer}>
      <Grid container alignItems="center">
        <Grid item>
          <IconButton color="default" aria-label="Email" href="mailto:sergibondarenko@gmail.com">
            <EmailIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="default" aria-label="GitHub" href="https://github.com/sergibondarenko/wordcharge">
            <GitHubIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            Copyright (C) 2021 by Sergii Bondarenko
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
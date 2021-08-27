import React, { useReducer } from 'react';
import {
  Grid,
  Typography,
  Snackbar,
  IconButton,
  responsiveFontSizes,
  MuiThemeProvider,
  createTheme,
  makeStyles
} from '@material-ui/core';
import {
  GitHub as GitHubIcon,
  Email as EmailIcon
} from '@material-ui/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { WorkSpacePage } from './pages/WorkSpacePage';
import { Alert } from './components';

import '@fontsource/roboto';
import './App.css';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    maxWidth: '1200px',
    margin: 'auto',
    padding: '10px 20px'
  },
  app_header: {
    marginBottom: '32px'
  },
  app_footer: {
    position: 'relative',
    bottom: 0,
    marginTop: '32px'
  },
  app_content: {
    flex: 1
  },
});

let theme = createTheme();
theme = responsiveFontSizes(theme);

export function Header() {
  const classes = useStyles();  
  return (
    <div className={classes.app_header}>
      <Typography variant="h1">Wordcharge</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Create cards of words from a text. Use the cards to learn languages.
      </Typography>
    </div>
  );
}

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

const initialState = {
  isToast: false,
  toastText: 'Unknown error!',
  toastSeverity: 'error', // info, success, warning, error
  isAlert: false,
  alertText: 'Unknown error!',
  alertSeverity: 'error' // info, success, warning, error
};

const ACTION_SNACKBAR_ERROR = 'action_snackbar_error';
const ACTION_SNACKBAR_WARNING = 'action_snackbar_warning';
const ACTION_SNACKBAR_CLOSE = 'action_snackbar_close';
const ACTION_ALERT_ERROR = 'action_alert_error';
const ACTION_ALERT_WARNING = 'action_alert_warning';
const ACTION_ALERT_CLOSE = 'action_alert_close';

export function stateReducer(state, action) {
  switch (action.type) {
    case ACTION_SNACKBAR_ERROR:
      return { ...state, isToast: true, toastText: action.payload };
    case ACTION_SNACKBAR_WARNING:
      return { ...state, isToast: true, toastSeverity: 'warning', toastText: action.payload };
    case ACTION_SNACKBAR_CLOSE:
      return { ...state, isToast: false };
    case ACTION_ALERT_ERROR:
      return { ...state, isAlert: true, alertText: action.payload };
    case ACTION_ALERT_WARNING:
      return { ...state, isAlert: true, alertSeverity: 'warning', alertText: action.payload };
    case ACTION_ALERT_CLOSE:
      return { ...state, isAlert: false };
    default:
      break;
  }
}

export function App() {
  const classes = useStyles();
  const [ state, dispatch ] = useReducer(stateReducer, initialState);

  function triggerErrorToast(text) {
    dispatch({ type: ACTION_SNACKBAR_ERROR, payload: text });
  }

  function triggerWarningToast(text) {
    dispatch({ type: ACTION_SNACKBAR_WARNING, payload: text });
  }

  function handleCloseToast() {
    dispatch({ type: ACTION_SNACKBAR_CLOSE });
  }

  function triggerErrorAlert(text) {
    dispatch({ type: ACTION_ALERT_ERROR, payload: text });
  }

  function triggerWarningAlert(text) {
    dispatch({ type: ACTION_ALERT_WARNING, payload: text });
  }

  function handleCloseAlert() {
    dispatch({ type: ACTION_ALERT_CLOSE });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.app}>
          <Header />
          <div className={classes.app_content}>
            <Grid container direction="column" spacing={4}>
              {state.isAlert && (
                <Grid item>
                  <Alert
                    data-testid="app-alert"
                    severity={state.alertSeverity}
                    onClose={handleCloseAlert}
                  >
                    {state.alertText}
                  </Alert>
                </Grid>
              )}
              <Grid item>
                <Switch>
                  <Route path='/workspace/:spaceId'>
                    <WorkSpacePage
                      triggerWarningToast={triggerWarningToast}
                      triggerErrorToast={triggerErrorToast}
                      triggerWarningAlert={triggerWarningAlert}
                      triggerErrorAlert={triggerErrorAlert}
                      onCloseToast={handleCloseToast}
                      onCloseAlert={handleCloseAlert}
                    />
                  </Route>
                  <Route path='/home'>
                    <HomePage
                      triggerWarningToast={triggerWarningToast}
                      triggerErrorToast={triggerErrorToast}
                      triggerWarningAlert={triggerWarningAlert}
                      triggerErrorAlert={triggerErrorAlert}
                      onCloseToast={handleCloseToast}
                      onCloseAlert={handleCloseAlert}
                    />
                  </Route>
                  <Route path='/'>
                    <HomePage
                      triggerWarningToast={triggerWarningToast}
                      triggerErrorToast={triggerErrorToast}
                      triggerWarningAlert={triggerWarningAlert}
                      triggerErrorAlert={triggerErrorAlert}
                      onCloseToast={handleCloseToast}
                      onCloseAlert={handleCloseAlert}
                    />
                  </Route>
                </Switch>
              </Grid>
            </Grid>
          </div>
          <Footer />
          <Snackbar
            open={state.isToast}
            autoHideDuration={6000}
            onClose={handleCloseToast}
          >
            <Alert
              data-testid="app-alert-toast"
              onClose={handleCloseToast}
              severity={state.toastSeverity}
              style={{ minWidth: '400px' }}
            >
              {state.toastText}
            </Alert>
          </Snackbar>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

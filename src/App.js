import React, { useReducer } from 'react';
import {
  Grid,
  responsiveFontSizes,
  MuiThemeProvider,
  createTheme,
  makeStyles,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WorkSpacePage } from './pages/WorkSpacePage';
import { UserProfilePage } from './pages/UserProfilePage';
import { Alert, AlertToaster, Footer, Header, Breadcrumbs } from './components';
import { Auth0ProviderWithHistory } from './auth';

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
  app_content: {
    flex: 1
  },
  app_breadcrumbs: {
    marginBottom: '24px'
  }
});

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
        <Auth0ProviderWithHistory>
          <div className={classes.app}>
            <Header />
            <div className={classes.app_breadcrumbs}>
              <Breadcrumbs />
            </div>
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
                    <Route path='/user-profile/:userNickname'>
                      <UserProfilePage
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
            <AlertToaster
              isOpen={state.isToast}
              alertSeverity={state.toastSeverity}
              alertText={state.toastText}
              onCloseSnackbar={handleCloseToast}
              onCloseAlert={handleCloseToast}
            />
          </div>
        </Auth0ProviderWithHistory>
      </Router>
    </MuiThemeProvider>
  );
}

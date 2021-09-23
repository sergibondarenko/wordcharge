import React from 'react';
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
import { Footer, Header, Breadcrumbs } from './components';
import { AuthProviderWithHistory, AuthProtectedRoute } from './auth';
import { MainContextProvider } from './contexts';

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

export function App() {
  const classes = useStyles();

  return (
    <MainContextProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <AuthProviderWithHistory>
            <div className={classes.app}>
              <Header />
              <div className={classes.app_breadcrumbs}>
                <Breadcrumbs />
              </div>
              <div className={classes.app_content}>
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <Switch>
                      <Route path='/work-space/:spaceId'>
                        <WorkSpacePage />
                      </Route>
                      <Route path='/home'>
                        <HomePage />
                      </Route>
                      <AuthProtectedRoute
                        path='/user-profile/:userNickname'
                        component={UserProfilePage}
                      />
                      <Route path='/'>
                        <HomePage/>
                      </Route>
                    </Switch>
                  </Grid>
                </Grid>
              </div>
              <Footer />
            </div>
          </AuthProviderWithHistory>
        </Router>
      </MuiThemeProvider>
    </MainContextProvider>
  );
}

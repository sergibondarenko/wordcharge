import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography, Button, TextField, makeStyles } from '@material-ui/core';
import { AuthenticatedHttpClient } from '../../services';
import { MainContext } from '../../contexts';

const useStyles = makeStyles(() => ({
  user_data_field: {
    backgroundColor: 'white'
  },
}));

function RawUserData({ data }) {
  const classes = useStyles();
  if (!data) return null;

  return <TextField
    id="user-data-field"
    variant="outlined"
    className={classes.user_data_field}
    placeholder="Paste your text here"
    multiline
    fullWidth
    value={JSON.stringify(data, null, 2)}
    inputProps={{
      readOnly: true
    }}
  />
}

export function UserProfilePage() {
  const { triggerErrorToast } = useContext(MainContext);
  const { user, getAccessTokenSilently } = useAuth0();
  const authHttpClient = new AuthenticatedHttpClient({ getAccessToken: getAccessTokenSilently });
  const [userData, setUserData] = useState(null);

  async function handleRawUserData() {
    try {
      const { data } = await authHttpClient.get('/api/user');
      console.log('handleRawUserData, data', data);
      setUserData(data);
    } catch (err) {
      console.error('UserProfilePage, handleRawUserData', err);
      triggerErrorToast(`Failed to fetch the user raw data from the server. ${err.message}`);
    }
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleRawUserData}>More</Button>
      </Grid>
      <Grid item>
        <RawUserData data={userData} />
      </Grid>
    </Grid>
  );
}
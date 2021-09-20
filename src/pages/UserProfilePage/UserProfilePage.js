import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@material-ui/core';

export function UserProfilePage() {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    history.push('/');
    return null;
  }

  return (
    <>
      <Typography>{user.name}</Typography>
      <Typography>{user.email}</Typography>
    </>
  );
}
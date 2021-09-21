import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@material-ui/core';

export function UserProfilePage() {
  const { user } = useAuth0();

  return (
    <>
      <Typography>{user.name}</Typography>
      <Typography>{user.email}</Typography>
    </>
  );
}
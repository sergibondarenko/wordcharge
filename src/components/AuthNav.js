import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { Button, Avatar } from '@material-ui/core';

export function LogInButton() {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>
}

export function SignUpButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return isAuthenticated
    ? null
    : <Button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Sign Up</Button>;
}

export function LogOutButton() {
  const { logout } = useAuth0();
  return <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
}

export function AuthenticationButton() {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <LogOutButton /> : <LogInButton />;
}

export function UserProfileButton() {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth0();

  function handleClick() {
    history.push('/user-profile/' + user.nickname);
  }

  return isAuthenticated
    ? <Button
        endIcon={<Avatar alt={user?.name} src={user?.picture} />}
        onClick={handleClick}
      >
          {user.nickname}
        </Button>
    : null;
}

export function AuthNav() {
  return (
    <>
      <SignUpButton />
      <AuthenticationButton />
      <UserProfileButton />
    </>
  );
}
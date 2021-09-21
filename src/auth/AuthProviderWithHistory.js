import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

export function AuthProviderWithHistory({ children }) {
  const domain = process.env.REACT_APP_WORDCHARGE_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_WORDCHARGE_AUTH0_CLIENT_ID;

  const history = useHistory();

  function onRedirectCallback(appState) {
    history.push(appState?.returnTo || window.location.pathname);
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
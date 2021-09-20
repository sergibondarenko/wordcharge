import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />

export function BreadcrumbsLinks() {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return (
      <LinkRouter color="textPrimary" to="/">
        home
      </LinkRouter>
    );
  }
  
  return (
    <>
      <LinkRouter color="inherit" to="/">
        home
      </LinkRouter>
      {" "}
      <LinkRouter color="textPrimary" to={pathname}>
        {pathname}
      </LinkRouter>
    </>
  );
}

export function Breadcrumbs() {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <BreadcrumbsLinks />
    </MuiBreadcrumbs>
  );
}

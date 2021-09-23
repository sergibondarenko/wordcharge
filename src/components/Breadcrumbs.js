import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@material-ui/core';
import { NavigateNext as NavigateNextIcon } from '@material-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { startCase } from 'lodash';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />

export function Breadcrumbs() {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return (
      <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <LinkRouter color="textPrimary" to="/">
          My Spaces
        </LinkRouter>
      </MuiBreadcrumbs>
    );
  }

  let pathnameVisual = pathname.split('/').filter((str) => !!str.length);
  pathnameVisual[0] = startCase(pathnameVisual[0]);
  pathnameVisual = pathnameVisual.join(' ');

  return (
    <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <LinkRouter color="inherit" to="/">
        My Spaces
      </LinkRouter>
      {" "}
      <LinkRouter color="textPrimary" to={pathname}>
        {pathnameVisual}
      </LinkRouter>
    </MuiBreadcrumbs>
  );
}

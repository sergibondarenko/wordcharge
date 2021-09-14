import React from 'react';
import { WorkSpaceGrid } from './WorkSpaceGrid';

export function HomePage({ ...props }) {
  return <div data-testid="app-home"><WorkSpaceGrid { ...props } /></div>;
}
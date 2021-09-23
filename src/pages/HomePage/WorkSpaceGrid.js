import React, { useEffect, useState, useCallback } from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import { throttle } from 'lodash';
import { WorkSpaceService, BrowserLocalStorageService } from '../../services';
import { WorkSpaceCard } from './WorkSpaceCard';
import { useAlertToaster } from '../../hooks';

const useStyles = makeStyles({
  workspace_search_field: {
    backgroundColor: 'white'
  }
});

export function WorkSpaceSearchField({ value, onChange }) {
  const classes = useStyles();
  return (
    <TextField
      id="work-space-search"
      data-testid="work-space-search"
      variant="outlined"
      className={classes.workspace_search_field}
      label="Search"
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
}

export function WorkSpaces({ data, onFilter, onDelete }) {
  return (
    data.filter(onFilter).map((space, i) => {
      return (
        <Grid item key={i} xs={12} sm={6} md={2}>
          <WorkSpaceCard
            title={space.title}
            text={space.text}
            id={space.id}
            onDelete={onDelete}
          />
        </Grid>
      );
    })
  );
}

export function WorkSpaceGrid() {
  const { triggerErrorToast } = useAlertToaster();
  const [workSpaces, setWorkSpaces] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const workSpaceService = new WorkSpaceService({ storage: new BrowserLocalStorageService() });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    try {
      let data = await workSpaceService.fetchAll();
      data.sort((a, b) => b.timestamp - a.timestamp);
      data = [workSpaceService.getNewWorkSpace(), ...data];
      setWorkSpaces(data);
    } catch (err) {
      console.error('WorkSpaceGrid, fetchData', err);
      triggerErrorToast(`Failed to fetch the work spaces data. ${err.message}`);
    }
  }

  async function handleDeleteSpaceCard(id) {
    try {
      await workSpaceService.delete(id);
      fetchData();
    } catch (err) {
      console.error('WorkSpaceGrid, handleDeleteSpaceCard', err);
      triggerErrorToast(`Failed to delete the work spaces data. ${err.message}`);
    }
  }

  function handleWorkSpaceSearchValue(value) {
    if (!value) setSearchValue('');
    else if (value.length > 2) setSearchValue(value);
  }

  const handleWorkSpaceSearchValueThrottled = useCallback(
    throttle(handleWorkSpaceSearchValue, 1000), []
  );

  function handleWorkSpaceSearchInput(e) {
    const value = e.target.value;
    setSearchInput(value);
    handleWorkSpaceSearchValueThrottled(value);
  }

  function workSpacesSearchFilter(space) {
    return !searchValue || space.title.toLowerCase().includes(searchValue.toLowerCase());
  }

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12}>
        <WorkSpaceSearchField value={searchInput} onChange={handleWorkSpaceSearchInput} />
      </Grid>
      <Grid item container spacing={4} alignItems="stretch">
        <WorkSpaces data={workSpaces} onFilter={workSpacesSearchFilter} onDelete={handleDeleteSpaceCard} />
      </Grid>
    </Grid>
  );
}
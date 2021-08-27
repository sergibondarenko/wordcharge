import React, { useEffect, useState, useCallback } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { throttle } from 'lodash';
import { StorageForWorkSpaces } from '../../services';
import { WorkSpaceCard } from './WorkSpaceCard';

export function WorkSpaceSearchField({ value, onChange }) {
  return (
    <TextField
      id="work-space-search"
      data-testid="work-space-search"
      variant="outlined"
      style={{ backgroundColor: 'white' }}
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
        <Grid item key={i} xs>
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

export function WorkSpaceGrid({ triggerErrorToast }) {
  const [workSpaces, setWorkSpaces] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const storage = new StorageForWorkSpaces();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchData() {
    try {
      let data = storage.fetchAll();
      data.sort((a, b) => b.timestamp - a.timestamp);
      data = [storage.getNewWorkSpace(), ...data];
      setWorkSpaces(data);
    } catch (err) {
      console.error('WorkSpaceGrid, fetchData', err);
      triggerErrorToast(`Failed to fetch the work spaces data. ${err.message}`);
    }
  }

  function handleDeleteSpaceCard(id) {
    storage.remove(id);
    fetchData();
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
      <Grid item>
        <WorkSpaceSearchField value={searchInput} onChange={handleWorkSpaceSearchInput} />
      </Grid>
      <Grid item container spacing={4}>
        <WorkSpaces data={workSpaces} onFilter={workSpacesSearchFilter} onDelete={handleDeleteSpaceCard} />
      </Grid>
    </Grid>
  );
}
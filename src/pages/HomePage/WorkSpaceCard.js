import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import { ConfirmDialog } from '../../components';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  card_content: {
    flex: 1
  },
  card_content_title: {
    fontSize: 18,
    wordBreak: 'break-all'
  },
  card_content_text: {
    fontSize: 16,
    marginBottom: 12,
    wordBreak: 'break-all'
  },
  card_actions: {
    position: 'relative',
    bottom: 0
  }
}));

const ConfirmDeletionDialog = ConfirmDialog;

export function DeleteButton({ onClick, spaceTitle }) {
  return (
    <IconButton
      data-testid={`work-space-btn-delete-${spaceTitle}`}
      aria-label="delete"
      onClick={onClick}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export function EnterButton({ onClick, spaceTitle }) {
  return (
    <Button
      size="small"
      data-testid={`work-space-btn-enter-${spaceTitle}`}
      onClick={onClick}
    >
      Enter
    </Button>
  );
}

export function TitleField({ value }) {
  const classes = useStyles();
  return (
    <Typography variant="h5" component="h2" className={classes.card_content_title}>  
      {value.slice(0, 40)} 
    </Typography>
  )
}

export function SpaceTextField({ value }) {
  const classes = useStyles();
  return (
    <Typography className={classes.card_content_text} color="textSecondary">
      {value.slice(0, 60)}
    </Typography>
  );
}

export function WorkSpaceCard({ title, text, id, onDelete }) {
  const history = useHistory();
  const classes = useStyles();

  const [ isConfirmDeletionDialog, setIsConfirmDeletionDialog ] = useState(false);

  function handleDelete() {
    setIsConfirmDeletionDialog(true);
  }

  function handleEnter() {
    history.push(`/workspace/${id}`);
  }

  function handleCloseConfirmDeletionDialog() {
    setIsConfirmDeletionDialog(false);
  }

  function handleConfirmDeletionDialog() {
    setIsConfirmDeletionDialog(false);
    onDelete(id);
  }

  return (
    <>
      <ConfirmDeletionDialog
        isOpen={isConfirmDeletionDialog}
        onClose={handleCloseConfirmDeletionDialog}
        onConfirm={handleConfirmDeletionDialog}
      />
      <Card className={classes.card} variant="elevation" data-testid="work-space-card">
        <CardContent className={classes.card_content}>
          <TitleField value={title} />
          <SpaceTextField value={text} />
        </CardContent>
        <CardActions className={classes.card_actions}>
          <EnterButton onClick={handleEnter} spaceTitle={title} />
          <DeleteButton onClick={handleDelete} spaceTitle={title} />
        </CardActions>
      </Card>
    </>
  );
}

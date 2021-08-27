import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import { ConfirmDialog } from '../../components';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    maxHeight: 300,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ConfirmDeletionDialog = ConfirmDialog;

export function WorkSpaceCard({ title, text, id, onDelete }) {
  const history = useHistory();
  const classes = useStyles();
  const cardText = text.slice(0, 50);

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
      <Card className={classes.root} variant="elevation" data-testid="work-space-card">
        <CardContent>
          <Typography variant="h5" component="h2">  
            {title} 
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {cardText}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            data-testid={`work-space-btn-enter-${title}`}
            onClick={handleEnter}
          >
            Enter
          </Button>
          <IconButton
            data-testid={`work-space-btn-delete-${title}`}
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

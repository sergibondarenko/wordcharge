import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Translate as TranslateIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    minHeight: 150,
  },
  word: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold'
  },
  word_translation: {
    marginBottom: 12,
    fontSize: 16,
  },
});

export function WordCard({
  dictionaries,
  isLoadingDictionaries,
  currentDictionary,
  allWordsFromText,
  currentWordIdx,
  isTranslatingCurrentWord,
  currentWordTranslation, 
  onNext,
  onPrev,
  onTranslate,
  onSelectDictionary,
  onDelete
}) {
  const classes = useStyles();
  const word = allWordsFromText[currentWordIdx];
  const wordN = currentWordIdx + 1;
  const wordCount = allWordsFromText.length;

  function handleTranslate() {
    onTranslate();
  }

  function handleNext() {
    onNext();
  }

  function handlePrev() {
    onPrev();
  }

  return (
    <Card className={classes.root} variant="elevation" spacing={2} data-testid="word-card">
      <CardContent>
        <Grid container direction="column" spacing={2} wrap="nowrap">
          <Grid item>
            {isLoadingDictionaries ? <CircularProgress /> : (
              <Autocomplete
                id="word-card-list-of-dict"
                disableClearable={true}
                value={currentDictionary}
                options={dictionaries}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) => option.value === value.value}
                style={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Dictionary" variant="outlined" />}
                onChange={onSelectDictionary}
              />
            )}
          </Grid>
          <Grid item>
            <Typography className={classes.word} data-testid="word-card-word">
              {word}
            </Typography>
          </Grid>
          <Grid item>
            {isTranslatingCurrentWord ? <CircularProgress /> : (
              <Typography className={classes.word_translation} data-testid="word-card-word-translation">
                {currentWordTranslation}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions style={{ paddingLeft: '16px', paddingRight: '16px' }}>
        <Button size="small" startIcon={<TranslateIcon />} onClick={handleTranslate}>Translate</Button>
        <IconButton
          aria-label="delete"
          data-testid="word-card-btn-delete"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="previous"
          data-testid="word-card-btn-prev"
          style={{ marginLeft: 'auto' }}
          onClick={handlePrev}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          aria-label="next"
          data-testid="word-card-btn-next"
          onClick={handleNext}
        >
          <NavigateNextIcon />
        </IconButton>
        <Typography>
          {wordN}/{wordCount}
        </Typography>
      </CardActions>
    </Card>
  );
}

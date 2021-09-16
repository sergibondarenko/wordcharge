import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  TextField,
  makeStyles,
  Link
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Translate as TranslateIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  card: {
    height: '100%',
    width: '100%'
  },
  card_actions: {
    padding: '0 16px'
  },
  card_content: {
    minHeight: '200px'
  },
  card_content_word: {
    fontWeight: 'bold'
  },
});

export function WordMatch({ text, onClick }) {
  function matchWords(text) {
    // For example
    // fd-ita-eng: mela melo mal
    return text.match(/(fd-[a-z]{3}-[a-z]{3}:)(.*)/i) || [];
  }

  return (
    <div data-testid="word-card-word-match">
      {text
        .split('\n')
        .map((row, i) => {
          const [,, words] = matchWords(row);      

          if (!words) {
            return <Typography key={i}>{row}</Typography>;
          }

          return (
            <Grid container key={i} spacing={1}>
              {words
                .trim()
                .split(' ')
                .map((word, i) => {
                  return (
                    <Grid item key={i}>
                      <Link onClick={() => onClick(word)}>{word}</Link>
                    </Grid>
                  );
                })}
            </Grid>
          );
        })}
    </div>
  );

}

export function WordTranslation({ isTranslating, text }) {
  function isMeta(text) {
    return text.match(/freedict/i) !== null;
  }

  if (isTranslating) {
    return <CircularProgress />;
  } else {
    // Is definition.
    return (
      <div data-testid="word-card-word-translation">
        {text
          .split('\n')
          .filter((row) => row && !isMeta(row))
          .map((row, i) => {
            return (
              <Typography key={i}>{row}</Typography>
            );
          })}
      </div>
    );
  }
}

export function WordField({ value }) {
  const classes = useStyles();
  return (
    <Typography className={classes.card_content_word} data-testid="word-card-word">
      {value}
    </Typography>
  );
}

export function DictionariesField({ value, options, onChange }) {
  return (
    <Autocomplete
      id="word-card-list-of-dict"
      disableClearable={true}
      value={value}
      options={options}
      getOptionLabel={(option) => option.title}
      getOptionSelected={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} label="Dictionary" variant="outlined" />}
      onChange={onChange}
    />
  );
}

export function TranslateButton({ onClick }) {
  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<TranslateIcon />}
      onClick={onClick}
    >
      Translate
    </Button>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <IconButton
      aria-label="delete"
      data-testid="word-card-btn-delete"
      onClick={onClick}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export function WordCountField({ value }) {
  return (
    <Typography>{value}</Typography>
  );
}

export function PrevButton({ onClick }) {
  return (
    <IconButton
      aria-label="previous"
      data-testid="word-card-btn-prev"
      onClick={onClick}
    >
      <NavigateBeforeIcon />
    </IconButton>
  );
}

export function NextButton({ onClick }) {
  return (
    <IconButton
      aria-label="next"
      data-testid="word-card-btn-next"
      onClick={onClick}
    >
      <NavigateNextIcon />
    </IconButton>
  );
}

export function WordCard({
  dictionaries,
  isLoadingDictionaries,
  currentDictionary,
  allWordsFromText,
  currentWordIdx,
  isTranslatingCurrentWord,
  currentWordTranslation, 
  currentWordMatch,
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

  function handleTranslate(text) {
    onTranslate(text);
  }

  function handleNext() {
    onNext();
  }

  function handlePrev() {
    onPrev();
  }

  return (
    <Card className={classes.card} variant="elevation" spacing={2} data-testid="word-card">
      <CardContent className={classes.card_content}>
        <Grid container direction="column" spacing={2} wrap="nowrap">
          <Grid item xs={12}>
            {isLoadingDictionaries ? <CircularProgress /> : (
              <DictionariesField value={currentDictionary} options={dictionaries} onChange={onSelectDictionary} />
            )}
          </Grid>
          <Grid item xs={12}>
            <WordField value={word} />
          </Grid>
          {currentWordMatch !== null && (
            <Grid item xs={12}>
              <WordMatch text={currentWordMatch} onClick={handleTranslate} />
            </Grid>
          )}
          {currentWordTranslation !== null && (
            <Grid item xs={12}>
              <WordTranslation
                text={currentWordTranslation}
                isTranslating={isTranslatingCurrentWord}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions className={classes.card_actions}>
        <Grid container spacing={2} justifyContent="space-between" direction="row">
          <Grid item>
            <Grid item container alignItems="center">
              <Grid item>
                <TranslateButton onClick={handleTranslate} />
              </Grid>
              <Grid item>
                <DeleteButton onClick={onDelete} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container alignItems="center">
              <Grid item>
                <WordCountField value={`${wordN}/${wordCount}`} />
              </Grid>
              <Grid item>
                <PrevButton onClick={handlePrev} />
              </Grid>
              <Grid item>
                <NextButton onClick={handleNext} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

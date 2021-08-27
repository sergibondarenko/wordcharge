import React, { useEffect, useReducer, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useHistory } from "react-router-dom";
import { Grid, TextField, Button, CircularProgress, Typography, Link } from '@material-ui/core';
import { StorageForWorkSpaces, StorageForDeletedWordCards } from '../../services';
import { ConfirmDialog } from '../../components';
import { WordCard  } from './WordCard';

const ConfirmWordDeletionDialog = ConfirmDialog;

function isTextFieldError(value, inputWasTouched = false) {
  return inputWasTouched && !value;
}

function validateTextField(value, inputWasTouched = false) {
  return inputWasTouched && !value ? 'Required' : null;
}

export function WorkSpaceTitle({ value, onChange }) {
  const [wasTouched, setWasTouched] = useState(false);

  return (
    <TextField
      id="work-space-title"
      data-testid="work-space-title"
      fullWidth
      variant="outlined"
      style={{ backgroundColor: 'white' }}
      label="Title"
      value={value}
      onChange={(e) => {
        setWasTouched(true);
        onChange(e);
      }}
      error={isTextFieldError(value, wasTouched)}
      helperText={validateTextField(value, wasTouched)}
      required
    />
  );
}

export function WorkSpaceText({ value, onChange }) {
  const [wasTouched, setWasTouched] = useState(false);

  return (
    <TextField
      id="work-space-text"
      variant="outlined"
      style={{ padding: '1px', backgroundColor: 'white' }}
      placeholder="Paste your text here"
      multiline
      fullWidth
      minRows={10}
      maxRows={20}
      value={value}
      label="Text"
      onChange={(e) => {
        setWasTouched(true);
        onChange(e);
      }}
      error={isTextFieldError(value, wasTouched)}
      helperText={validateTextField(value, wasTouched)}
      required
    />
  );
}

export function buildWordsFromText(text = '', storageForDeletedWordcards) {
  const dict = new Set();
  const punctuationRegex = /[!"#$%&()*+,-./:;<=>?\\^_`{|}~]/g;

  text.trim().split(/\s+/).forEach((word) => {
    const _word = word.replace(punctuationRegex, ' ').trim().toLowerCase();
    if (storageForDeletedWordcards) {
      if (_word && !storageForDeletedWordcards.wasWordDeleted(_word)) dict.add(_word);
    } else {
      if (_word) dict.add(_word);
    }
  });

  return [...dict];
}

const DEFAULT_DICTIONARY_VALUE = 'eng-deu';
export function findDefaultDictionary(dictionaries = []) {
  return dictionaries.filter((d) => d.value === DEFAULT_DICTIONARY_VALUE).pop();
}

export function filterMetaOutOfTranslationResult(translationResult = '', currentDictValue) {
  return translationResult
    .split('\n')
    .filter((l) => l &&
      !l.includes(currentDictValue) &&
      !l.includes('efinition found') &&
      !l.includes('efinitions found'))
    .join('\n');
}

function getInitialState() {
  return {
    id: uuidv4(),
    title: 'New',
    text: 'To be, or not to be, that is the question ...',
    dictionaries: [],
    isLoadingDictionaries: false,
    currentDictionary: null,
    allWordsFromText: [],
    isParsingTextForWords: false,
    currentWordIdx: 0,
    isTranslatingCurrentWord: false,
    currentWordTranslation: null,
    isWordDeletionDialog: false,
  };
}

const ACTION_LOAD_DICTIONARIES_START = 'action_load_dictionaries_start';
const ACTION_LOAD_DICTIONARIES_END = 'action_load_dictionaries_end';
const ACTION_LOAD_DICTIONARIES_ERROR = 'action_load_dictionaries_error';
const ACTION_BUILD_DICTIONARY_FROM_TEXT_START = 'action_build_dictionary_from_text_start';
const ACTION_BUILD_DICTIONARY_FROM_TEXT_END = 'action_build_dictionary_from_text_end';
const ACTION_SWITCH_TO_NEXT_WORD = 'action_switch_to_next_word';
const ACTION_SWITCH_TO_PREV_WORD = 'action_switch_to_prev_word';
const ACTION_DELETE_WORD = 'action_delete_word';
const ACTION_DELETE_WORD_ERROR = 'action_delete_word_error';
const ACTION_TRANSLATE_WORD_START = 'action_translate_word_start';
const ACTION_TRANSLATE_WORD_END = 'action_translate_word_end';
const ACTION_TRANSLATE_WORD_ERROR = 'action_translate_word_error';
const ACTION_SET_CURRENT_DICTIONARY = 'action_set_current_dictionary';
const ACTION_FETCH_WORKSPACE = 'action_fetch_workspace';
const ACTION_MODIFY_TITLE = 'action_modify_title';
const ACTION_MODIFY_TEXT = 'action_modify_text';
const ACTION_CONFIRM_WORD_DELETION = 'action_confirm_word_deletion';
const ACTION_CANCEL_WORD_DELETION = 'action_cancel_word_deletion';

function stateReducer(state, action) {
  switch (action.type) {
    case ACTION_LOAD_DICTIONARIES_START:
      return { ...state, isLoadingDictionaries: true };
    case ACTION_LOAD_DICTIONARIES_END:
      return {
        ...state,
        isLoadingDictionaries: false,
        dictionaries: action.payload,
        currentDictionary: state.currentDictionary ? state.currentDictionary : findDefaultDictionary(action.payload), 
      };
    case ACTION_LOAD_DICTIONARIES_ERROR:
      return {
        ...state,
        isLoadingDictionaries: false,
        dictionaries: [],
        currentDictionary: null, 
      };
    case ACTION_BUILD_DICTIONARY_FROM_TEXT_START:
      return { ...state, isParsingTextForWords: true };
    case ACTION_BUILD_DICTIONARY_FROM_TEXT_END:
      return {
        ...state,
        isParsingTextForWords: false,
        allWordsFromText: action.payload,
        currentWordTranslation: '',
        currentWordIdx: 0,
      };
    case ACTION_SWITCH_TO_NEXT_WORD:
      if (state.currentWordIdx + 1 >= state.allWordsFromText.length) return state;
      return { ...state, currentWordIdx: state.currentWordIdx + 1, currentWordTranslation: '' };
    case ACTION_SWITCH_TO_PREV_WORD:
      if (state.currentWordIdx - 1 < 0) return state;
      return { ...state, currentWordIdx: state.currentWordIdx - 1, currentWordTranslation: '' };
    case ACTION_DELETE_WORD:
      const allWordsFromText = state.allWordsFromText.slice();
      allWordsFromText.splice(state.currentWordIdx, 1);
      return { ...state, allWordsFromText, isWordDeletionDialog: false };
    case ACTION_DELETE_WORD_ERROR:
      return { ...state, isWordDeletionDialog: false };
    case ACTION_TRANSLATE_WORD_START:
      return { ...state, isTranslatingCurrentWord: true };
    case ACTION_TRANSLATE_WORD_END:
      return {
        ...state,
        isTranslatingCurrentWord: false,
        currentWordTranslation: filterMetaOutOfTranslationResult(action.payload, state.currentDictionary.value)
      };
    case ACTION_TRANSLATE_WORD_ERROR:
      return { ...state, isTranslatingCurrentWord: false, currentWordTranslation: '' };
    case ACTION_SET_CURRENT_DICTIONARY:
      return { ...state, currentDictionary: action.payload };
    case ACTION_FETCH_WORKSPACE:
      return { ...state, ...action.payload };
    case ACTION_MODIFY_TITLE:
      return { ...state, title: action.payload };
    case ACTION_MODIFY_TEXT:
      return { ...state, text: action.payload };
    case ACTION_CONFIRM_WORD_DELETION:
      return { ...state, isWordDeletionDialog: true };
    case ACTION_CANCEL_WORD_DELETION:
      return { ...state, isWordDeletionDialog: false };
    default:
      break;
  }
}

export function WorkSpacePage({ triggerErrorToast, triggerWarningAlert, onCloseAlert }) {
  const isMountedRef = useRef(null);
  const { spaceId } = useParams();
  const history = useHistory();
  const storageForWorkSpaces = new StorageForWorkSpaces();
  const storageForDeletedWordcards = new StorageForDeletedWordCards();

  const [ state, dispatch ] = useReducer(stateReducer, getInitialState());

  useEffect(() => {
    isMountedRef.current = true;
    fetchData();
    return () => isMountedRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    fetchWorkSpace();
    fetchDictionaries();
  }

  function fetchWorkSpace() {
    try {
      const space = storageForWorkSpaces.fetch(spaceId);
      if (isMountedRef.current && space !== -1) {
        dispatch({ type: ACTION_FETCH_WORKSPACE, payload: space });
      }
    } catch (err) {
      console.error('WorkSpacePage, fetchWorkSpace', err);
      triggerErrorToast(`Failed to fetch the work space. ${err.message}`);
    }
  }

  async function fetchDictionaries() {
    dispatch({ type: ACTION_LOAD_DICTIONARIES_START });

    try {
      let res = await fetch(`/api/translate`);

      if (res.ok) {
        res = await res.json();
        if (isMountedRef.current) {
          dispatch({ type: ACTION_LOAD_DICTIONARIES_END, payload: res.data });
        }
      } else {
        throw res;
      }
    } catch (err) {
      console.error('WorkSpacePage, fetchDictionaries', err);
      triggerErrorToast('Failed to fetch the dictionaries.');
      dispatch({ type: ACTION_LOAD_DICTIONARIES_ERROR });
    }
  }

  function handleTitleChange(e) {
    dispatch({ type: ACTION_MODIFY_TITLE, payload: e.target.value });
  }

  function handleTextChange(e) {
    dispatch({ type: ACTION_MODIFY_TEXT, payload: e.target.value });
  }

  function handleClose() {
    history.push('/');
  }

  function handleSubmit() {
    const { id, title, text, currentDictionary } = state;
    if (!text || !title) return; 
    storageForWorkSpaces.add({ id, title, text, currentDictionary });
    handleClose();
  }

  function handleBuildWordsFromText() {
    let dict = [];
    const { text } = state;

    try {
      dispatch({ type: ACTION_BUILD_DICTIONARY_FROM_TEXT_START });
      dict = buildWordsFromText(text, storageForDeletedWordcards);

      if (!dict.length) {
        triggerWarningAlert(
          <Typography>
            You do not have new words here. You can <Link onClick={() => restoreAllTheWordsFromText(text)}>restore the words</Link>.
          </Typography>
        );
      }
    } catch (err) {
      console.error('WorkSpacePage, handleBuildWordsFromText', err);
      triggerErrorToast(`Failed to build words dictionary from the text. ${err.message}`);
    }
    
    dispatch({ type: ACTION_BUILD_DICTIONARY_FROM_TEXT_END, payload: dict });
  }

  function restoreAllTheWordsFromText(text) {
    let dict = [];

    try {
      dispatch({ type: ACTION_BUILD_DICTIONARY_FROM_TEXT_START });
      dict = buildWordsFromText(text);
      storageForDeletedWordcards.restoreWords(dict);
      onCloseAlert();
    } catch (err) {
      console.error('WorkSpacePage, restoreAllTheWordsFromText', err);
    }

    dispatch({ type: ACTION_BUILD_DICTIONARY_FROM_TEXT_END, payload: dict });
  }

  function switchToTheNextWord() {
    dispatch({ type: ACTION_SWITCH_TO_NEXT_WORD });
  }

  function switchToThePrevWord() {
    dispatch({ type: ACTION_SWITCH_TO_PREV_WORD });
  }

  async function handleTranslate() {
    dispatch({ type: ACTION_TRANSLATE_WORD_START });
    const { currentDictionary, allWordsFromText, currentWordIdx } = state;

    try {
      if (!currentDictionary) {
        throw new Error('You must select a dictionary first.');
      }
  
      let res = await fetch(`/api/translate/${currentDictionary.value}/${allWordsFromText[currentWordIdx]}`);

      if (res.ok) {
        res = await res.json(); 
        dispatch({ type: ACTION_TRANSLATE_WORD_END, payload: res.data });
      } else if (res.status === 404) {
        dispatch({ type: ACTION_TRANSLATE_WORD_END, payload: 'Not found' });
      } else {
        throw res;
      }
    } catch (err) {
      console.error('WorkSpacePage, handleTranslate', err);
      triggerErrorToast(`Failed to translate "${allWordsFromText[currentWordIdx]}" ${JSON.stringify(currentDictionary)}.`);
      dispatch({ type: ACTION_TRANSLATE_WORD_ERROR });
    }
  }

  function handleDictionarySelection(e, option) {
    dispatch({ type: ACTION_SET_CURRENT_DICTIONARY, payload: option });
  }

  function handleDeleteWord() {
    dispatch({ type: ACTION_CONFIRM_WORD_DELETION });
  }

  function handleCloseConfirmDeletionDialog() {
    dispatch({ type: ACTION_CANCEL_WORD_DELETION });
  }

  function handleConfirmDeletionDialog() {
    const { allWordsFromText, currentWordIdx } = state;

    try {
      storageForDeletedWordcards.deleteWord(allWordsFromText[currentWordIdx]);
      dispatch({ type: ACTION_DELETE_WORD });
    } catch (err) {
      console.error('WorkSpacePage, handleDeleteWord', err);
      triggerErrorToast(`Failed to delete word at index ${currentWordIdx}. ${err.message}`);
      dispatch({ type: ACTION_DELETE_WORD_ERROR });
    }
  }

  return (
    <>
      <ConfirmWordDeletionDialog
        isOpen={state.isWordDeletionDialog}
        onClose={handleCloseConfirmDeletionDialog}
        onConfirm={handleConfirmDeletionDialog}
      />
      <form noValidate autoComplete="off">
        <Grid container direction="column" spacing={4} data-testid="app-work-space">
         <Grid item>
          <WorkSpaceTitle value={state.title} onChange={handleTitleChange} />
         </Grid>
         {!!state.allWordsFromText.length && (
            <Grid item>
              <WordCard
                {...state}
                onNext={switchToTheNextWord}
                onPrev={switchToThePrevWord}
                onTranslate={handleTranslate}
                onSelectDictionary={handleDictionarySelection}
                onDelete={handleDeleteWord}
              />
            </Grid>
         )}
         <Grid item>
          <WorkSpaceText value={state.text} onChange={handleTextChange} />
         </Grid>
         <Grid item container spacing={2} justifyContent="space-between">
           <Grid item>
             <Button
              disabled={state.isParsingTextForWords}
              color={state.isParsingTextForWords ? 'secondary' : 'primary'}
              startIcon={state.isParsingTextForWords ? <CircularProgress /> : null}
              variant="contained"
              onClick={handleBuildWordsFromText}
             >
               Dictionary
             </Button>
           </Grid>
           <Grid item>
             <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
             </Grid>
           </Grid>
         </Grid>
        </Grid>
      </form>
    </>
  );
}

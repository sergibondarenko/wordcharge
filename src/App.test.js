import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor, cleanup, prettyDOM } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { App } from './App';

function getWorkSpaceCardEnterBtn(spaceTitle) {
  return screen.getByTestId(`work-space-btn-enter-${spaceTitle}`);
}

function getWorkSpaceCardDeleteBtn(spaceTitle) {
  return screen.getByTestId(`work-space-btn-delete-${spaceTitle}`);
}

function getBtnClose() {
  return screen.getByText('Close');
}

function getBtnEnter() {
  return screen.getByText('Enter');
}

function getBtnSave() {
  return screen.getByText('Save');
}

function getBtnDictionary() {
  return screen.getByText('Dictionary');
}

function getWordCardTranslateBtn() {
  return screen.getByText('Translate');
}

function getBtnConfirm() {
  return screen.getByText('Confirm');
}

function getBtnNo() {
  return screen.getByText('No');
}

function getWorkSpacePageTitleInput(labelText = 'Title *') {
  return screen.getByLabelText(labelText, { selector: 'input' })
}

function getWorkSpacePageTextInput(labelText = 'Text *') {
  return screen.getByLabelText(labelText, { selector: 'textarea' })
}

function getWordCardDictionaryInput(labelText = 'Dictionary') {
  return screen.getByLabelText(labelText, { selector: 'input' })
}

function getSearchInput(labelText = 'Search') {
  return screen.getByLabelText(labelText, { selector: 'input' })
}

function getWordCardNextBtn() {
  return screen.getByTestId('word-card-btn-next');
}

function getWordCardPrevBtn() {
  return screen.getByTestId('word-card-btn-prev');
}

function getWordCardDeleteBtn() {
  return screen.getByTestId('word-card-btn-delete');
}

function queryWordCard() {
  return screen.queryByTestId('word-card');
}

function queryWordCardWord() {
  return screen.queryByTestId('word-card-word');
}

function queryWordCardTranslation() {
  return screen.queryByTestId('word-card-word-translation');
}

function getWordCardTranslation() {
  return screen.getByTestId('word-card-word-translation');
}

function queryWordCardMatch() {
  return screen.queryByTestId('word-card-word-match');
}

function getWordCardMatch() {
  return screen.getByTestId('word-card-word-match');
}

function getHomePage() {
  return screen.getByTestId('app-home');
}

function getWorkSpacePage() {
  return screen.getByTestId('app-work-space');
}

const server = setupServer(
  rest.get('/api/translate', (req, res, ctx) => {
    const data = [
      { title: 'English-German', value: 'fd-eng-deu' },
      { title: 'German-English', value: 'fd-deu-eng' },
    ];

    return res(ctx.json({ data }));
  }),
)

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  cleanup();
  jest.clearAllMocks();
});

afterAll(() => server.close());

test('Render the home page', () => {
  render(<App />);
  expect(screen.getByText(/wordcharge/i)).toBeInTheDocument();
  expect(screen.getByText(/create cards of words from a text. use the cards to learn languages/i)).toBeInTheDocument()
});

test('Open a new work space and close it', async () => {
  render(<App />);

  // Enter the New work space
  let btnEnter = getBtnEnter();
  fireEvent.click(btnEnter);
  await waitFor(() => getWorkSpacePageTitleInput());
  
  // Search the New work space for the default values.
  expect(screen.getByText(/wordcharge/i)).toBeInTheDocument();
  expect(screen.getByText(/create cards of words from a text. use the cards to learn languages/i)).toBeInTheDocument()
  expect(getWorkSpacePageTitleInput()).toHaveValue('New');
  expect(getWorkSpacePageTextInput()).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Paste your text here')).toBeInTheDocument();

  // Close the work space.
  const btnClose = getBtnClose();
  fireEvent.click(btnClose);
  await waitFor(() => getBtnEnter());

  // Back to the home page.
  btnEnter = getWorkSpaceCardEnterBtn('New');
  expect(btnEnter).toBeInTheDocument();
  const btnDelete = getWorkSpaceCardDeleteBtn('New');
  expect(btnDelete).toBeInTheDocument();
});

test('Create a new work space and delete it', async () => {
  render(<App />);

  const btnEnterWorkSpace = getWorkSpaceCardEnterBtn('New');
  fireEvent.click(btnEnterWorkSpace);
  await waitFor(() => getWorkSpacePageTitleInput());

  // Put a new value in the title.
  const inputTitleValue = 'Hamlet';
  const inputTitle = getWorkSpacePageTitleInput();
  fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
  expect(inputTitle.value).toBe(inputTitleValue);

  // Putt a new value in the text.
  const inputTextValue = 'To be or not to be ...';
  const inputText = getWorkSpacePageTextInput();
  fireEvent.change(inputText, { target: { value: inputTextValue } });
  expect(inputText.value).toBe(inputTextValue);

  // Save.
  const btnSave = getBtnSave();
  fireEvent.click(btnSave);
  await waitFor(() => {
    // Expect that the space card holds the space title and a slice of the text.
    expect(screen.getByText(inputTitleValue)).toBeInTheDocument();
    expect(screen.getByText(inputTextValue)).toBeInTheDocument();
  });

  // Back to the home page.
  const btnEnter = getWorkSpaceCardEnterBtn(inputTitleValue);
  expect(btnEnter).toBeInTheDocument();

  // Enter the newly created work space.
  fireEvent.click(btnEnter);

  // Search the work space for the values.
  expect(screen.getByDisplayValue(inputTitleValue)).toBeInTheDocument();
  expect(screen.getByDisplayValue(inputTextValue)).toBeInTheDocument();

  // Close.
  const btnClose = getBtnClose();
  fireEvent.click(btnClose);
  await waitFor(() => getWorkSpaceCardDeleteBtn(inputTitleValue));
  
  // Expect the new work space card.
  expect(screen.queryByText('New')).toBeInTheDocument();

  // Expect the work space card.
  expect(screen.queryByText(inputTitleValue)).toBeInTheDocument();
  expect(screen.queryByText(inputTextValue)).toBeInTheDocument();

  // Go for deleting the work space and then click No.
  let btnDelete = getWorkSpaceCardDeleteBtn(inputTitleValue); 
  fireEvent.click(btnDelete);
  
  /// Confirm deletion dialog.
  await waitFor(() => screen.getByText(/are you sure?/i));

  /// Click No.
  fireEvent.click(getBtnNo());
  await waitFor(() => {
    // Expect the work space card.
    expect(screen.queryByText(inputTitleValue)).toBeInTheDocument();
    expect(screen.queryByText(inputTextValue)).toBeInTheDocument();
  });

  // Delete the work space.
  fireEvent.click(btnDelete);
  
  /// Confirm deletion dialog.
  await waitFor(() => screen.getByText(/are you sure?/i));

  /// Click Confirm.
  fireEvent.click(getBtnConfirm());
  await waitFor(() => {
    // Expect no work space card.
    expect(screen.queryByText(inputTitleValue)).not.toBeInTheDocument();
    expect(screen.queryByText(inputTextValue)).not.toBeInTheDocument();
  });
});

test('Stress test the work spaces', async () => {
  render(<App />);

  const workSpaces = [
    { title: 'title0', text: 'text0' },
    { title: 'title1', text: 'text1' },
    { title: 'title2', text: 'text2' },
    { title: 'title3', text: 'text3' },
    { title: 'title4', text: 'text4' },
    { title: 'title5', text: 'text5' },
    { title: 'title6', text: 'text6' },
    { title: 'title7', text: 'text7' },
    { title: 'title8', text: 'text8' },
    { title: 'title9', text: 'text9' },
  ];

  // Create the work spaces.
  for (let i = 0; i < workSpaces.length; i++) {
    const { title, text } = workSpaces[i];

    //// Enter the New work space.
    const btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());

    //// Put a new value in the title.
    let inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: title } });
    expect(inputTitle.value).toBe(title);

    //// Put a new value in the text.
    let inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: text } });
    expect(inputText.value).toBe(text);

    //// Save.
    fireEvent.click(getBtnSave());
    await waitFor(() => {
      //// Expect that the space card holds the space title and a slice of the text.
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  }

  // All the work spaces must be on the home page.
  for (let i = 0; i < workSpaces.length; i++) {
    const { title, text } = workSpaces[i];
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  }
});

test('Show error toast when unable to fetch a word translation in a work space', async () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  server.use(
    rest.get('/api/translate', (req, res, ctx) => {
      const data = [
        { title: 'English-German', value: 'eng-deu' },
        { title: 'German-English', value: 'deu-eng' },
      ];

      return res(ctx.json({ data }));
    }),
    rest.get('/api/translate/:dictValue/:word', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  
  render(<App />);

  // Enter the new work space.
  fireEvent.click(getBtnEnter());
  await waitFor(() => getWorkSpacePageTitleInput());

  // Put a new value in the text.
  const inputTextValue = 'To be or not to be ...';
  const inputText = getWorkSpacePageTextInput();
  fireEvent.change(inputText, { target: { value: inputTextValue } });
  
  // Create word cards from the text.
  fireEvent.click(getBtnDictionary());
  
  // Try to translate.
  await waitFor(() => getWordCardTranslateBtn());
  fireEvent.click(getWordCardTranslateBtn());

  // Read the error toast message.
  await waitFor(() => screen.getByText(/failed to translate.*/i));

  fireEvent.click(getBtnClose());
  spy.mockClear();
});

test('Show error toast when unable to fetch dictionaries in a work space', async () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  server.use(
    rest.get('/api/translate', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  
  render(<App />);

  fireEvent.click(getBtnEnter());
  await waitFor(() => screen.getByText(/failed to fetch the dictionaries/i));

  fireEvent.click(getBtnClose());
  spy.mockClear();
});

test('Show alert if all words were deleted/remembered in a work space, then restore the words', async () => {
  render(<App />);

  let btnEnter = getWorkSpaceCardEnterBtn('New');
  fireEvent.click(btnEnter);
  await waitFor(() => getWorkSpacePageTitleInput());

  // Put a new value in the text.
  const inputTextValue = 'hello you';
  const inputText = getWorkSpacePageTextInput();
  fireEvent.change(inputText, { target: { value: inputTextValue } });
  expect(inputText.value).toBe(inputTextValue);
  
  // Create word cards from the text.
  fireEvent.click(getBtnDictionary());
  await waitFor(() => {
    expect(queryWordCard()).toBeInTheDocument();
  })

  // Go for deleting the word "hello" and then click no.
  fireEvent.click(getWordCardDeleteBtn());
  await waitFor(() => screen.getByText(/are you sure?/i));
  fireEvent.click(getBtnNo());
  await waitFor(() => {
    expect(queryWordCard()).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  /// Delete words: hello and you.
  fireEvent.click(getWordCardDeleteBtn());
  await waitFor(() => screen.getByText(/are you sure?/i));
  fireEvent.click(getBtnConfirm());
  await waitFor(() => {
    expect(queryWordCard()).toBeInTheDocument();
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
    expect(screen.getByText('you')).toBeInTheDocument();
  });

  fireEvent.click(getWordCardDeleteBtn());
  await waitFor(() => screen.getByText(/are you sure?/i));
  fireEvent.click(getBtnConfirm());
  await waitFor(() => {
    expect(queryWordCard()).not.toBeInTheDocument();
  });

  // Click the Dictionary button again and see that there are not word cards.
  // Because all words were deleted/remembered.
  fireEvent.click(getBtnDictionary());
  await waitFor(() => screen.getByText(/you do not have new words here. you can .*/i))
  expect(queryWordCard()).not.toBeInTheDocument();

  // Click the "restore the words" link.
  fireEvent.click(screen.getByText(/restore the words/i));
  await waitFor(() => {
    // See no warning.
    expect(screen.queryByText(/you do not have new words here. you can .*/i)).not.toBeInTheDocument();
    // See the word cards appear.
    expect(queryWordCard()).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  }); 

  fireEvent.click(getBtnClose());
  await waitFor(() => getHomePage());
});

test('Search for a work space', async () => {
  act(() => {
    render(<App />);
  });

  const workSpaces = [
    { title: 'Hamlet', text: 'To be or not to be' },
    { title: 'The Merchant of Venice', text: 'Your mind is tossing on the ocean' },
  ];

  // Create the work spaces.
  for (let i = 0; i < workSpaces.length; i++) {
    const { title, text } = workSpaces[i];
  
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());

    /// Put a new value in the title.
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: title } });

    /// Put a new value in the text.
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: text } });

    fireEvent.click(getBtnSave());
    await waitFor(() => getHomePage());
  }

  // Search for the work spaces.
  for (let i = 0; i < workSpaces.length; i++) {
    const { title } = workSpaces[i];

    const inputSearch = getSearchInput();
    fireEvent.change(inputSearch, { target: { value: title.toLowerCase() } });

    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
      // Expect only the work space you are searching for.
      expect(screen.getAllByTestId('work-space-card')).toHaveLength(1);
    });

    fireEvent.change(inputSearch, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
      // Expect 2 custom work spaces plus the New work space.
      expect(screen.getAllByTestId('work-space-card')).toHaveLength(3);
    });
  }
});

test('Validation of title and text in a work space', async () => {
  act(() => {
    render(<App />);
  });

  // Enter the New space
  let btnEnter = getWorkSpaceCardEnterBtn('New');
  fireEvent.click(btnEnter);
  await waitFor(() => getWorkSpacePageTitleInput());

  // Expect no validation errors.
  // Because the new space has both title and text values.
  expect(screen.queryAllByText('Required')).toHaveLength(0);

  // Put a new value in the title.
  const inputTitleValue = 'Hamlet'
  const inputTitle = getWorkSpacePageTitleInput();
  fireEvent.change(inputTitle, { target: { value: inputTitleValue } });

  // Put a new value in the text.
  const inputTextValue = 'Something is rotten in the state of Denmark.'
  const inputText = getWorkSpacePageTextInput();
  fireEvent.change(inputText, { target: { value: inputTextValue } });

  // Expect no validation errors.
  // Because there are values in the fields.
  expect(screen.queryAllByText('Required')).toHaveLength(0);

  // Delete the title value.
  fireEvent.change(inputTitle, { target: { value: '' } });
  
  // Try to save.
  // We stay on the same page because of the validation error.
  fireEvent.click(getBtnSave());
  await waitFor(() => getWorkSpacePage());

  // Expect the validation error for the title.
  expect(screen.queryAllByText('Required')).toHaveLength(1);

  // Put the title value back.
  fireEvent.change(inputTitle, { target: { value: inputTitleValue } });

  // Delete the text value.
  fireEvent.change(inputText, { target: { value: '' } });
  
  // Try to save.
  // We stay on the same page because of the validation error.
  fireEvent.click(getBtnSave());
  await waitFor(() => getWorkSpacePage());

  // Expect the validation error for the text.
  expect(screen.queryAllByText('Required')).toHaveLength(1);

  // We can't save but we can close.
  fireEvent.click(getBtnClose());
  await waitFor(() => getHomePage());
});

describe('Use word cards', () => {
  const server = setupServer(
    rest.get('/api/translate/:dictValue/:word', (req, res, ctx) => {
      const { word } = req.params;
      const dict = {
        to: "2 definitions found\n\nFrom English-German FreeDict Dictionary ver. 0.3.7 [fd-eng-deu]:\n\n  to /tou/\n  an, auf, nach, zu\n\nFrom English-German FreeDict Dictionary ver. 0.3.7 [fd-eng-deu]:\n\n  to) /tou/\n  ungünstig (für), von), überreden, überzeugen (zu",
        be: "No definitions found for \"be\", perhaps you mean:\nfd-eng-deu:  bed  bee  bet  he  me  re  we  by",
        or: "1 definition found\n\nFrom English-German FreeDict Dictionary ver. 0.3.7 [fd-eng-deu]:\n\n  or /ər/\n  oder",
        bed: "1 definition found\n\nFrom English-German FreeDict Dictionary ver. 0.3.7 [fd-eng-deu]:\n\n  bed /bd/\n  Beet <n>, Bett <n>, betten, Lager <n>, setzen",
        me: "1 definition found\n\nFrom English-German FreeDict Dictionary ver. 0.3.7 [fd-eng-deu]:\n\n  me /m/\n  mich, mir"
      };
      const data = dict[word] || 'Not found';

      return res(ctx.json({ data }));
    }),
    rest.get('/api/translate', (req, res, ctx) => {
      const data = [
        { title: 'English-German', value: 'fd-eng-deu' },
        { title: 'German-English', value: 'fd-deu-eng' },
      ];

      return res(ctx.json({ data }));
    }),
  )

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
    cleanup();
    jest.clearAllMocks();
  });

  afterAll(() => server.close());

  test('Create cards', async () => {
    act(() => {
      render(<App />);
    });
 
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());
    expect(queryWordCard()).not.toBeInTheDocument();
 
    // Put a new value in the title.
    const inputTitleValue = 'Hamlet';
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
    expect(inputTitle.value).toBe(inputTitleValue);
 
    // Put a new value in the text.
    const inputTextValue = 'To be or not to be ...';
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: inputTextValue } });
    expect(inputText.value).toBe(inputTextValue);
   
    // Create word cards from the text.
    let expectedWord = 'to';
    expect(screen.queryByText(expectedWord)).not.toBeInTheDocument();
    expect(queryWordCard()).not.toBeInTheDocument();
    const btnDictionary = getBtnDictionary();
    fireEvent.click(btnDictionary);
    await waitFor(() => {
      expect(queryWordCard()).toBeInTheDocument();
    })
   
    expect(screen.getByText(expectedWord)).toBeInTheDocument();
    // Expect that we are on the 1 word card out of 4.
    // We have a set of words here. Thus there are no duplicates.
    let expectedCount = '1/4';
    expect(screen.getByText(expectedCount)).toBeInTheDocument();
 
    // Expect that the default eng-deu dictionary was selected.
    let inputDictionaries = null;
    await waitFor(async () => {
      inputDictionaries = getWordCardDictionaryInput();
    });
    const defaultDict = 'English-German';
    expect(inputDictionaries).toHaveValue(defaultDict);

    fireEvent.click(getBtnClose());
    await waitFor(() => getHomePage());
  });

  test('Switch dictionaries', async () => {
    act(() => {
      render(<App />);
    });
 
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());
 
    // Put a new value in the title.
    const inputTitleValue = 'Hamlet';
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
 
    // Put a new value in the text.
    const inputTextValue = 'To be or not to be ...';
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: inputTextValue } });
   
    // Create word cards from the text.
    fireEvent.click(getBtnDictionary());
    await waitFor(() => queryWordCard());
 
    // Expect that the default eng-deu dictionary was selected.
    let inputDictionaries = null;
    await waitFor(async () => {
      inputDictionaries = getWordCardDictionaryInput();
    });
    const defaultDict = 'English-German';
 
    // Change the dictionary
    fireEvent.change(inputDictionaries, { target: { value: 'German-English' } });
    expect(inputDictionaries).toHaveValue('German-English');
    fireEvent.change(inputDictionaries, { target: { value: defaultDict } });
    expect(inputDictionaries).toHaveValue(defaultDict);

    fireEvent.click(getBtnClose());
    await waitFor(() => getHomePage());
  });

  test('Switch cards', async () => {
    act(() => {
      render(<App />);
    });
 
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());
 
    // Put a new value in the title.
    const inputTitleValue = 'Hamlet';
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
 
    // Put a new value in the text.
    const inputTextValue = 'To be or not to be ...';
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: inputTextValue } });
   
    // Create word cards from the text.
    fireEvent.click(getBtnDictionary());
    await waitFor(() => getWordCardDictionaryInput());
    fireEvent.change(getWordCardDictionaryInput(), { target: { value: 'German-English' } });

    const wordCards = [
      { word: 'to', count: '1/4' },
      { word: 'be', count: '2/4' },
      { word: 'or', count: '3/4' },
      { word: 'not', count: '4/4' },
    ];
   
    const btnNext = getWordCardNextBtn();
    const btnPrev = getWordCardPrevBtn();

    // Switch next.
    for (let i = 0; i < wordCards.length; i++) {
      expect(queryWordCardTranslation()).not.toBeInTheDocument();
      expect(queryWordCardMatch()).not.toBeInTheDocument();
      expect(screen.getByText(wordCards[i].word)).toBeInTheDocument();
      expect(screen.getByText(wordCards[i].count)).toBeInTheDocument();  
      if (i < wordCards.length - 1) fireEvent.click(btnNext);
    }

    // Switch to the first card.
    fireEvent.click(btnNext);
    expect(screen.getByText(wordCards[0].word)).toBeInTheDocument();
    expect(screen.getByText(wordCards[0].count)).toBeInTheDocument();  

    // Switch to the last card.
    fireEvent.click(btnPrev);
    expect(screen.getByText(wordCards[3].word)).toBeInTheDocument();
    expect(screen.getByText(wordCards[3].count)).toBeInTheDocument();  

    // Switch prev.
    for (let i = wordCards.length - 1; i >= 0; i--) {
      expect(queryWordCardTranslation()).not.toBeInTheDocument();
      expect(queryWordCardMatch()).not.toBeInTheDocument();
      expect(screen.getByText(wordCards[i].word)).toBeInTheDocument();
      expect(screen.getByText(wordCards[i].count)).toBeInTheDocument();  
      if (i > 0) fireEvent.click(btnPrev);
    }

    fireEvent.click(getBtnClose());
    await waitFor(() => getHomePage());
  });

  test('Delete cards', async () => {
    act(() => {
      render(<App />);
    });
 
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());
 
    // Put a new value in the title.
    const inputTitleValue = 'Hamlet';
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
 
    // Put a new value in the text.
    const inputTextValue = 'To be or not to be ...';
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: inputTextValue } });
   
    // Create word cards from the text.
    fireEvent.click(getBtnDictionary());
    await waitFor(() => getWordCardDictionaryInput());
    fireEvent.change(getWordCardDictionaryInput(), { target: { value: 'German-English' } });

    // Delete the word card.  
    const btnDelete = getWordCardDeleteBtn();
    fireEvent.click(btnDelete);
   
    await waitFor(() => screen.getByText(/are you sure?/i));
    fireEvent.click(getBtnConfirm());
 
    await waitFor(() => {
      const expectedWord = 'be';
      const expectedCount = '1/3';
      expect(screen.getByText(expectedWord)).toBeInTheDocument();
      expect(screen.getByText(expectedCount)).toBeInTheDocument();
    });
   
    // Save the space.
    const btnSave = screen.getByText('Save');
    fireEvent.click(btnSave);
    await waitFor(() => screen.getByText(inputTitleValue));
   
    // Enter the space.
    btnEnter = getWorkSpaceCardEnterBtn(inputTitleValue); 
    fireEvent.click(btnEnter);
    await waitFor(() => screen.getByDisplayValue(inputTitleValue));
 
    // Make sure the "to" word is not present (because it was deleted/remembered).
    fireEvent.click(getBtnDictionary());
    await waitFor(() => queryWordCard());

    expect(screen.queryByText('to')).not.toBeInTheDocument(); // because it was deleted
    expect(screen.queryByText('be')).toBeInTheDocument();

    fireEvent.click(getBtnClose());
    await waitFor(() => getHomePage());
  });

  test('Translate words', async () => {
    act(() => {
      render(<App />);
    });
 
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());
 
    // Put a new value in the title.
    const inputTitleValue = 'Hamlet';
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
 
    // Put a new value in the text.
    const inputTextValue = 'To be or not to be ...';
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: inputTextValue } });
   
    // Create word cards from the text.
    fireEvent.click(getBtnDictionary());
    await waitFor(() => getWordCardDictionaryInput());
    fireEvent.change(getWordCardDictionaryInput(), { target: { value: 'German-English' } });

    const wordCards = [
      {
        word: 'to',
        translation: [
          '2 definitions found',
          'to /tou/',
          'an, auf, nach, zu',
          'to) /tou/',
          'ungünstig (für), von), überreden, überzeugen (zu'
        ]
      },
      {
        word: 'be'
      }
    ];

    let word = wordCards[0].word;
    let translation = wordCards[0].translation;
    expect(screen.getByText(word)).toBeInTheDocument();
    expect(queryWordCardTranslation()).not.toBeInTheDocument();
    expect(queryWordCardMatch()).not.toBeInTheDocument();

    /// Translate
    fireEvent.click(getWordCardTranslateBtn());
    await waitFor(() => getWordCardTranslation());

    for (let j = 0; j < translation.length; j++) {
      expect(screen.getByText(translation[j])).toBeInTheDocument();
    }

    fireEvent.click(getWordCardNextBtn());

    word = wordCards[1].word;
    expect(screen.getByText(word)).toBeInTheDocument();
    expect(queryWordCardTranslation()).not.toBeInTheDocument();
    expect(queryWordCardMatch()).not.toBeInTheDocument();

    fireEvent.click(getBtnClose());
    await waitFor(() => getHomePage());
  });

  test('Translate words that were returned as a possible match', async () => {
    act(() => {
      render(<App />);
    });
 
    let btnEnter = getWorkSpaceCardEnterBtn('New');
    fireEvent.click(btnEnter);
    await waitFor(() => getWorkSpacePageTitleInput());
 
    // Put a new value in the title.
    const inputTitleValue = 'Hamlet';
    const inputTitle = getWorkSpacePageTitleInput();
    fireEvent.change(inputTitle, { target: { value: inputTitleValue } });
 
    // Put a new value in the text.
    const inputTextValue = 'be to';
    const inputText = getWorkSpacePageTextInput();
    fireEvent.change(inputText, { target: { value: inputTextValue } });
   
    // Create word cards from the text.
    fireEvent.click(getBtnDictionary());
    await waitFor(() => getWordCardDictionaryInput());
    fireEvent.change(getWordCardDictionaryInput(), { target: { value: 'German-English' } });

    const wordCards = [
      {
        word: 'be',
        translation: [
          'No definitions found for "be", perhaps you mean:',
          'bed',
          'bee',
          'bet',
          'he',
          'me',
          're',
          'we',
          'by'
        ]
      },
      { word: 'to' }
    ];

    let word = wordCards[0].word;
    let translation = wordCards[0].translation;
    expect(queryWordCardTranslation()).not.toBeInTheDocument();
    expect(queryWordCardMatch()).not.toBeInTheDocument();

    /// Translate
    fireEvent.click(getWordCardTranslateBtn());
    await waitFor(() => getWordCardMatch());

    for (let j = 0; j < translation.length; j++) {
      expect(screen.getByText(translation[j])).toBeInTheDocument();
    }

    const matchWords = [
      {
        word: 'bed',
        translation: [
          '1 definition found',
          'bed /bd/',
          'Beet <n>, Bett <n>, betten, Lager <n>, setzen'
        ]
      },
      {
        word: 'me',
        translation: [
          '1 definition found',
          'me /m/',
          'mich, mir'
        ]
      }
    ];

    for (let i = 0; i < matchWords.length; i++) {
      const { word, translation } = matchWords[i];
      fireEvent.click(screen.getByText(word));
      await waitFor(() => getWordCardTranslation());

      for (let j = 0; j < translation.length; j++) {
        expect(screen.getByText(translation[j])).toBeInTheDocument();
      }
    }

    fireEvent.click(getWordCardNextBtn());

    word = wordCards[1].word;
    expect(screen.getByText(word)).toBeInTheDocument();
    expect(queryWordCardTranslation()).not.toBeInTheDocument();
    expect(queryWordCardMatch()).not.toBeInTheDocument();

    fireEvent.click(getBtnClose());
    await waitFor(() => getHomePage());
  });
});

const WORDCHARGE_DELETED_WORD_CARDS_INDEX = 'wordcharge-deleted-word-cards';

export class WordCardsService {
  constructor({ storage } = {}) {
    this.storage = storage;
  }

  // We save a word to the storage to delete the word from word cards in UI.
  deleteWord(word, index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.put({ index, data: word });
  }

  fetchAllDeletedWords(index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.fetchAll({ index });
  }

  // We delete a word from the storage to put the word back to the word cards in UI.
  restoreWord(word, index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.delete({ index, data: word });
  }

  restoreWords(words = [], index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    const promises = [];
    for (const word of words) {
      promises.push(this.restoreWord(word, index));
    }
    return Promise.all(promises);
  }

  wasWordDeleted(word, index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.get({ index, data: word }).then((res) => res === -1);
  }
}

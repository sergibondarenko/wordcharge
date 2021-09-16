const WORDCHARGE_DELETED_WORD_CARDS_INDEX = 'wordcharge-deleted-word-cards';

export class WordCardsService {
  constructor({ storage } = {}) {
    this.storage = storage;
  }

  // We save a word to the storage to delete the word from word cards in UI.
  deleteWord(word, index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.put({ index, id: word, data: true });
  }

  fetchAllDeletedWords(index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.fetchAll({ index }).then((res) => {
      const map = {};
      for (const { id: word } of res) {
        map[word] = true;
      }
      return map;
    });
  }

  // We delete a word from the storage to put the word back to the word cards in UI.
  restoreWord(word, index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.delete({ index, id: word });
  }

  restoreWords(words = [], index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    const promises = [];
    for (const word of words) {
      promises.push(this.restoreWord(word, index));
    }
    return Promise.all(promises);
  }

  wasWordDeleted(word, index = WORDCHARGE_DELETED_WORD_CARDS_INDEX) {
    return this.storage.get({ index, id: word }).then((res) => res === -1);
  }
}

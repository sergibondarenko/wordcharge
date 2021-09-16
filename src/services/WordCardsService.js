import { BrowserLocalStorageService } from './BrowserLocalStorageService';

const DEFAULT = {};

export class WordCardsService extends BrowserLocalStorageService {
  constructor({ localStorageName = 'wordcharge-deleted-word-cards' } = {}) {
    super({ localStorageName });
  }

  _fetchAllMeta() {
    let data = this._fetchAll();
    if (!data) data = DEFAULT;
    return data;
  }

  deleteWord(word) {
    this._addAll({ ...this._fetchAllMeta(), [word]: true });
  }

  restoreWord(word) {
    const data = this._fetchAllMeta();
    delete data[word];
    this._addAll(data);
  }

  restoreWords(words = []) {
    const data = this._fetchAllMeta();
    for (const word of words) delete data[word];
    this._addAll(data);
  }

  wasWordDeleted(word) {
    const data = this._fetchAllMeta();
    return data[word] === true;
  }
}

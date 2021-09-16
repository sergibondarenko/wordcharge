const DEFAULT_STORAGE_DATA = {};
const WORDCHARGE_INDEX = 'wordcharge';

export class BrowserLocalStorageService {
  constructor({ localStorageName = 'wordcharge' } = {}) {
    this._localStorageName = localStorageName;
  }

  _addAll(obj, index) {
    if (!obj || typeof obj !== 'object') {
      throw new Error('The parameter must be of type object.');
    }

    localStorage.setItem(index || this._localStorageName, JSON.stringify(obj));
    return null;
  }

  _fetchAll(index) {
    return JSON.parse(localStorage.getItem(index || this._localStorageName)) || DEFAULT_STORAGE_DATA;
  }

  put({ index, data }) {
    return new Promise((resolve) => {
      const storageData = this._fetchAll(index);
      this._addAll({ ...storageData, [data]: true }, index);
      resolve(true);
    });
  }

  get({ index, data }) {
    return new Promise((resolve) => {
      const storageData = this._fetchAll(index);
      if (storageData[data]) resolve(storageData[data]);
      else resolve(-1);
    });
  }

  delete({ index, data }) {
    return new Promise((resolve) => {
      const storageData = this._fetchAll(index);

      if (storageData[data]) {
        const deletedData = storageData[data];
        delete storageData[data];
        this._addAll(storageData, index);
        resolve(deletedData);
      } else {
        resolve(-1);
      }
    });
  }

  fetchAll({ index }) {
    return Promise.resolve(this._fetchAll(index));
  }
}
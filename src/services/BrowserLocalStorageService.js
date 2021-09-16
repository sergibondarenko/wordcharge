export class BrowserLocalStorageService {
  constructor({ localStorageName = 'wordcharge' } = {}) {
    this._localStorageName = localStorageName;
  }

  _addAll(obj) {
    if (!obj || typeof obj !== 'object') {
      throw new Error('The parameter must be of type object.');
    }

    localStorage.setItem(this._localStorageName, JSON.stringify(obj));
    return null;
  }

  _fetchAll() {
    return JSON.parse(localStorage.getItem(this._localStorageName));
  }
}
const DEFAULT_STORAGE_DATA = {};

export class BrowserLocalStorageService {
  _addAll(obj, index) {
    if (!obj || typeof obj !== 'object') {
      throw new Error('The parameter must be of type object.');
    }

    localStorage.setItem(index, JSON.stringify(obj));
    return null;
  }

  _fetchAll(index) {
    return JSON.parse(localStorage.getItem(index)) || DEFAULT_STORAGE_DATA;
  }

  put({ index, id, data }) {
    return new Promise((resolve) => {
      const storageData = this._fetchAll(index);
      this._addAll({ ...storageData, [id]: data }, index);
      resolve(true);
    });
  }

  get({ index, id }) {
    return new Promise((resolve) => {
      const storageData = this._fetchAll(index);
      if (storageData[id]) resolve(storageData[id]);
      else resolve(-1);
    });
  }

  delete({ index, id }) {
    return new Promise((resolve) => {
      const storageData = this._fetchAll(index);

      if (storageData[id]) {
        delete storageData[id];
        this._addAll(storageData, index);
        resolve(id);
      } else {
        resolve(-1);
      }
    });
  }

  fetchAll({ index }) {
    return new Promise((resolve) => {
      const res = [];
      const data = this._fetchAll(index);

      for (const [id, val] of Object.entries(data)) {
        if (typeof val === 'object' && val !== null) res.push({ id, ...val });
        else res.push({ id, val });
      }

      resolve(res);
    });
  }
}
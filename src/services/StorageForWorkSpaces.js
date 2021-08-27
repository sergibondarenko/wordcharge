import { v4 as uuidv4 } from 'uuid';
import { BrowserLocalStorage } from './BrowserLocalStorage';

export class StorageForWorkSpaces extends BrowserLocalStorage {
  constructor({ localStorageName = 'wordcharge-work-spaces' } = {}) {
    super({ localStorageName });
  }

  _dataToUiData(data) {
    const res = [];

    for (const [id, val] of Object.entries(data)) {
      res.push({ id, ...val });
    }

    return res;
  }

  getNewWorkSpace() {
    return {
      id: uuidv4(),
      title: 'New',
      text: 'To be, or not to be, that is the question ...',
      timestamp: new Date().getTime() // ms
    };
  }

  fetchAll() { 
    const data = this._fetchAll();
    if (!data) return [];
    return this._dataToUiData(data);
  }

  fetch(id) {
    const data = this._fetchAll();
    if (!data || !Object.keys(data).length || !data[id]) return -1;
    return { id, ...data[id] };
  }

  add(obj) {
    const { id, ...rest } = obj;
    let newData = { [id]: { ...rest, timestamp: new Date().getTime() } };

    const data = this._fetchAll();
    if (data) newData = { ...data, ...newData };

    return this._addAll(newData);
  }

  remove(id) {
    const data = this._fetchAll();    
    if (!data || !Object.keys(data).length || !data[id]) return -1;
  
    delete data[id];
    return this._addAll(data);
  }
}
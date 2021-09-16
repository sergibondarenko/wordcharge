import { v4 as uuidv4 } from 'uuid';

const WORDCHARGE_WORK_SPACES_INDEX = 'wordcharge-work-spaces';

export class WorkSpaceService {
  constructor({ storage }) {
    this.storage = storage;
  }

  getNewWorkSpace() {
    return {
      id: uuidv4(),
      title: 'New',
      text: 'To be, or not to be, that is the question ...',
      timestamp: new Date().getTime() // ms
    };
  }

  fetchAll(index = WORDCHARGE_WORK_SPACES_INDEX) {
    return this.storage.fetchAll({ index });
  }

  get(id, index = WORDCHARGE_WORK_SPACES_INDEX) {
    return this.storage.get({ id, index });
  }

  put(space, index = WORDCHARGE_WORK_SPACES_INDEX) {
    const { id, ...data } = space;
    data.timestamp = new Date().getTime();
    return this.storage.put({ id, data, index });
  }

  delete(id, index = WORDCHARGE_WORK_SPACES_INDEX) {
    return this.storage.delete({ id, index }); 
  }
}

/*
export class WorkSpaceService extends BrowserLocalStorageService {
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
*/
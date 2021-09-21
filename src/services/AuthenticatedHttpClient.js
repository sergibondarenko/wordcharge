import { HttpClient } from './HttpClient';

export class AuthenticatedHttpClient extends HttpClient {
  constructor({ getAccessToken }) {
    super();
    this._getAccessToken = getAccessToken;
  }

  _authenticatedRequest(method, path, options) {
    return this._getAccessToken().then((token) => {
      if (!options.headers) options.headers = {};
      options.headers.Authorization = `Bearer ${token}`;
      return super[method](path, options);
    });
  }
  
  get(path, options = {}) {
    return this._authenticatedRequest('get', path, options);
  }

  post(path, options = {}) {
    return this._authenticatedRequest('post', path, options);
  }

  put(path, options = {}) {
    return this._authenticatedRequest('put', path, options);
  }

  delete(path, options = {}) {
    return this._authenticatedRequest('delete', path, options);
  }
}
export class HttpClient {
  _handleResponse(response) {
    return response.text().then((res) => {
      let data = res;
      console.log('HttpClient, this._handleResponse, data', data);
      if (data) data = JSON.parse(data);
      
      if (!response.ok) {
        let error = response.statusText;
        if (data && data.message) error = data.message;
        return Promise.reject(error);
      }
      
      return data;
    });
  }

  get(path, options = {}) {
    options.method = 'GET';
    console.log('HttpClient, get, options', options);

    return fetch(path, options).then(this._handleResponse);
  }

  post(path, options = {}) {
    options.method = 'POST';
    if (!options.headers) options.headers = {};
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);

    return fetch(path, options).then(this._handleResponse);
  }

  put(path, options = {}) {
    options.method = 'PUT';
    if (!options.headers) options.headers = {};
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);

    return fetch(path, options).then(this._handleResponse);
  }

  delete(path, options = {}) {
    options.method = 'DELETE';

    return fetch(path, options).then(this._handleResponse);
  }
}
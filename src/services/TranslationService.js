export const API_TYPE = {
  FREEDICT: 'freedict'
};

export async function fetchPublic(path, options) {
  try {
    const res = options ? await fetch(path, options) : await fetch(path);
    if (res.ok) return res.json();
    else throw res;
  } catch (err) {
    throw err;
  }
}

export function fetchPrivate(path, options = {}) {
  return async function(getAccessTokenSilently) {
    const token = await getAccessTokenSilently();
    if (!options.headers) options.headers = {};
    options.headers.Authorization = `Bearer ${token}`;
    return fetchPublic(path, options);
  }
}

export class TranslationService {
  constructor({ apiType, getAccessTokenSilently }) {
    this.apiType = apiType || API_TYPE.FREEDICT;
    this.getAccessTokenSilently = getAccessTokenSilently;
  }

  fetchAllDictionaries() {
    return fetchPublic(`/api/${this.apiType}/translate`);
  }

  async translate({ word, langPair }) {
    return fetchPublic(`/api/${this.apiType}/translate/${langPair}/${word}`);
  }
}
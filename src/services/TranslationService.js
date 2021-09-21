export const API_TYPE = {
  FREEDICT: 'freedict'
};
export class TranslationService {
  constructor({ apiType, httpClient }) {
    this.apiType = apiType || API_TYPE.FREEDICT;
    this.httpClient = httpClient;
  }

  fetchAllDictionaries() {
    return this.httpClient.get(`/api/${this.apiType}/translate`);
  }

  async translate({ word, langPair }) {
    return this.httpClient.get(`/api/${this.apiType}/translate/${langPair}/${word}`);
  }
}

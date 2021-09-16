export const API_TYPE = {
  FREEDICT: 'freedict'
};

export class TranslationService {
  constructor({ apiType = API_TYPE.FREEDICT } = {}) {
    this.apiType = apiType;
  }

  async fetchAllDictionaries() {
    try {
      const res = await fetch(`/api/${this.apiType}/translate`);
      if (res.ok) return res.json();
      else throw res;
    } catch (err) {
      throw err;
    }
  }

  async translate({ word, langPair }) {
    try {
      const res = await fetch(`/api/${this.apiType}/translate/${langPair}/${word}`);
      if (res.ok) return res.json();
      else throw res;
    } catch (err) {
      throw err;
    }
  }
}
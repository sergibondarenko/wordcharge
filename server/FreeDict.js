const { spawnSync } = require('child_process'); 

const dictSupported = new Set([
  'fd-hrv-eng',
  'fd-fin-por',
  'fd-fin-bul',
  'fd-fra-bul',
  'fd-deu-swe',
  'fd-fin-swe',
  'fd-jpn-rus',
  'fd-wol-fra',
  'fd-fra-pol',
  'fd-eng-deu',
  'fd-deu-nld',
  'fd-por-eng',
  'fd-spa-deu',
  'fd-ces-eng',
  'fd-swe-fin',
  'fd-eng-pol',
  'fd-pol-nor',
  'fd-eng-rom',
  'fd-eng-fra',
  'fd-fin-ell',
  'fd-eng-lit',
  'fd-ckb-kmr',
  'fd-ita-eng',
  'fd-pol-eng',
  'fd-gle-eng',
  'fd-eng-tur',
  'fd-gle-pol',
  'fd-pol-deu',
  'fd-fra-spa',
  'fd-lit-eng',
  'fd-eng-jpn',
  'fd-ara-eng',
  'fd-nld-ita',
  'fd-eng-lat',
  'fd-eng-hun',
  'fd-ita-jpn',
  'fd-dan-eng',
  'fd-hun-eng',
  'fd-pol-gle',
  'fd-fra-fin',
  'fd-nld-swe',
  'fd-nld-eng',
  'fd-deu-kur',
  'fd-deu-spa',
  'fd-eng-afr',
  'fd-eng-swe',
  'fd-jpn-deu',
  'fd-epo-eng',
  'fd-pol-nld',
  'fd-lat-deu',
  'fd-eng-cym',
  'fd-por-spa',
  'fd-eng-spa',
  'fd-swe-tur',
  'fd-tur-eng',
  'fd-tur-deu',
  'fd-pol-fra',
  'fd-eng-por',
  'fd-ita-pol',
  'fd-eng-ces',
  'fd-deu-tur',
  'fd-fra-jpn',
  'fd-cym-eng',
  'fd-bre-fra',
  'fd-jpn-fra',
  'fd-nld-deu',
  'fd-eng-nld',
  'fd-deu-por',
  'fd-eng-hrv',
  'fd-mkd-bul',
  'fd-swe-eng',
  'fd-pol-spa',
  'fd-jpn-eng',
  'fd-eng-ell',
  'fd-ita-por',
  'fd-pol-swe',
  'fd-pol-fin',
  'fd-kur-tur',
  'fd-ita-swe',
  'fd-eng-swh',
  'fd-kha-eng',
  'fd-fin-eng',
  'fd-eng-hin',
  'fd-spa-eng',
  'fd-afr-eng',
  'fd-ita-fin',
  'fd-eng-fin',
  'fd-fra-ita',
  'fd-deu-rus',
  'fd-deu-bul',
  'fd-deu-pol',
  'fd-srp-eng',
  'fd-kur-deu',
  'fd-spa-por',
  'fd-swe-pol',
  'fd-swe-rus',
  'fd-nld-spa',
  'fd-swh-pol',
  'fd-oci-cat',
  'fd-ita-rus',
  'fd-fra-ell',
  'fd-eng-srp',
  'fd-fra-tur',
  'fd-fra-eng',
  'fd-ita-ell',
  'fd-kur-eng',
  'fd-swe-deu',
  'fd-swe-fra',
  'fd-swe-lat',
  'fd-swe-ell',
  'fd-eng-rus',
  'fd-pol-por',
  'fd-gla-deu',
  'fd-eng-ita',
  'fd-pol-ita',
  'fd-fra-swe',
  'fd-isl-eng',
  'fd-swe-spa',
  'fd-nno-nob',
  'fd-swe-ita',
  'fd-fra-deu',
  'fd-fin-ita',
  'fd-nld-fra',
  'fd-eng-ara',
  'fd-slk-eng',
  'fd-fra-por',
  'fd-spa-ast',
  'fd-fin-jpn',
  'fd-deu-ita',
  'fd-swh-eng',
  'fd-fin-nor',
  'fd-fra-nld',
  'fd-lat-eng',
  'fd-eng-bul',
  'fd-deu-fra',
  'fd-swe-bul',
  'fd-deu-eng',
  'fd-pol-rus',
  'fd-ita-deu',
  'fd-eng-gle',
  'fd-swe-por',
  'fd-afr-deu',
  'fd-por-deu',
  'fd-fra-bre',
  'fd-san-deu',
  'fd-kha-deu',
  'fd-fra-rus',
  'fd-pol-ell'
]);

const languagePairsList = [
  { value: 'fd-hrv-eng', title: 'Croatian-English' },
  { value: 'fd-fin-por', title: 'suomi-portugu??s' },
  { value: 'fd-fin-bul', title: 'suomi-?????????????????? ????????' },
  { value: 'fd-fra-bul', title: 'fran??ais-?????????????????? ????????' },
  { value: 'fd-deu-swe', title: 'Deutsch-Svenska' },
  { value: 'fd-fin-swe', title: 'suomi-Svenska' },
  { value: 'fd-jpn-rus', title: 'Japanese-Russian' },
  { value: 'fd-wol-fra', title: 'Wolof-French' },
  { value: 'fd-fra-pol', title: 'fran??ais-j??zyk polski' },
  { value: 'fd-eng-deu', title: 'English-German' },
  { value: 'fd-deu-nld', title: 'German-Dutch' },
  { value: 'fd-por-eng', title: 'Portuguese-English' },
  { value: 'fd-spa-deu', title: 'Spanish-German' },
  { value: 'fd-ces-eng', title: 'Czech-English' },
  { value: 'fd-swe-fin', title: 'Svenska-suomi' },
  { value: 'fd-eng-pol', title: 'English-Polish' },
  { value: 'fd-pol-nor', title: 'j??zyk polski-Norsk' },
  { value: 'fd-eng-rom', title: 'English-Romanian' },
  { value: 'fd-eng-fra', title: 'English-French' },
  { value: 'fd-fin-ell', title: 'suomi-????????????????' },
  { value: 'fd-eng-lit', title: 'English-Lithuanian' },
  { value: 'fd-ckb-kmr', title: 'Sorani-Kurmanji' },
  { value: 'fd-ita-eng', title: 'Italian-English' },
  { value: 'fd-pol-eng', title: 'j??zyk polski-English' },
  { value: 'fd-gle-eng', title: 'Irish-English' },
  { value: 'fd-eng-tur', title: 'English-Turkish' },
  { value: 'fd-gle-pol', title: 'Irish-Polish' },
  { value: 'fd-pol-deu', title: 'j??zyk polski-Deutsch' },
  { value: 'fd-fra-spa', title: 'fran??ais-espa??ol' },
  { value: 'fd-lit-eng', title: 'Lithuanian-English' },
  { value: 'fd-eng-jpn', title: 'English-????????? (????????????)' },
  { value: 'fd-ara-eng', title: 'Arabic-English' },
  { value: 'fd-nld-ita', title: 'Nederlands-italiano' },
  { value: 'fd-eng-lat', title: 'English-Latin' },
  { value: 'fd-eng-hun', title: 'English-Hungarian' },
  { value: 'fd-ita-jpn', title: 'italiano-????????? (????????????)' },
  { value: 'fd-dan-eng', title: 'Danish-English' },
  { value: 'fd-hun-eng', title: 'Hungarian-English' },
  { value: 'fd-pol-gle', title: 'Polish-Irish' },
  { value: 'fd-fra-fin', title: 'fran??ais-suomi' },
  { value: 'fd-nld-swe', title: 'Nederlands-Svenska' },
  { value: 'fd-nld-eng', title: 'Dutch-English' },
  { value: 'fd-deu-kur', title: 'German-Kurdish' },
  { value: 'fd-deu-spa', title: 'Deutsch-espa??ol' },
  { value: 'fd-eng-afr', title: 'English-Afrikaans' },
  { value: 'fd-eng-swe', title: 'English-Swedish' },
  { value: 'fd-jpn-deu', title: 'Japanese-German' },
  { value: 'fd-epo-eng', title: 'Esperanto-English' },
  { value: 'fd-pol-nld', title: 'j??zyk polski-Nederlands' },
  { value: 'fd-lat-deu', title: 'Lateinisch-Deutsch' },
  { value: 'fd-eng-cym', title: 'Eurfa Saesneg }, English-Welsh' },
  { value: 'fd-por-spa', title: 'portugu??s-espa??ol' },
  { value: 'fd-eng-spa', title: 'English-Spanish' },
  { value: 'fd-swe-tur', title: 'Svenska-T??rk??e' },
  { value: 'fd-tur-eng', title: 'Turkish-English' },
  { value: 'fd-tur-deu', title: 'Turkish-German' },
  { value: 'fd-pol-fra', title: 'j??zyk polski-fran??ais' },
  { value: 'fd-eng-por', title: 'English-Portuguese' },
  { value: 'fd-ita-pol', title: 'italiano-j??zyk polski' },
  { value: 'fd-eng-ces', title: 'English-Czech' },
  { value: 'fd-deu-tur', title: 'German-Turkish' },
  { value: 'fd-fra-jpn', title: 'fran??ais-????????? (????????????)' },
  { value: 'fd-cym-eng', title: 'Eurfa Cymraeg }, Welsh-English' },
  { value: 'fd-bre-fra', title: 'Breton-French' },
  { value: 'fd-jpn-fra', title: 'Japanese-French' },
  { value: 'fd-nld-deu', title: 'Dutch-German' },
  { value: 'fd-eng-nld', title: 'English-Dutch' },
  { value: 'fd-deu-por', title: 'German-Portuguese' },
  { value: 'fd-eng-hrv', title: 'English-Croatian' },
  { value: 'fd-mkd-bul', title: 'Macedonian-Bulgarian' },
  { value: 'fd-swe-eng', title: 'Swedish-English' },
  { value: 'fd-pol-spa', title: 'j??zyk polski-espa??ol' },
  { value: 'fd-jpn-eng', title: 'Japanese-English' },
  { value: 'fd-eng-ell', title: 'English-Modern Greek' },
  { value: 'fd-ita-por', title: 'italiano-portugu??s' },
  { value: 'fd-pol-swe', title: 'j??zyk polski-Svenska' },
  { value: 'fd-pol-fin', title: 'j??zyk polski-suomi' },
  { value: 'fd-kur-tur', title: 'Kurdish-Turkish' },
  { value: 'fd-ita-swe', title: 'italiano-Svenska' },
  { value: 'fd-eng-swh', title: 'English-Swahili' },
  { value: 'fd-kha-eng', title: 'Khasi-English' },
  { value: 'fd-fin-eng', title: 'suomi-English' },
  { value: 'fd-eng-hin', title: 'English-Hindi' },
  { value: 'fd-spa-eng', title: 'Spanish-English' },
  { value: 'fd-afr-eng', title: 'Afrikaans-English' },
  { value: 'fd-ita-fin', title: 'italiano-suomi' },
  { value: 'fd-eng-fin', title: 'English-suomi' },
  { value: 'fd-fra-ita', title: 'fran??ais-italiano' },
  { value: 'fd-deu-rus', title: 'Deutsch-??????????????' },
  { value: 'fd-deu-bul', title: 'Deutsch-?????????????????? ????????' },
  { value: 'fd-deu-pol', title: 'Deutsch-j??zyk polski' },
  { value: 'fd-srp-eng', title: 'Serbian-English' },
  { value: 'fd-kur-deu', title: 'Kurdish-German' },
  { value: 'fd-spa-por', title: 'Spanish-Portuguese' },
  { value: 'fd-swe-pol', title: 'Svenska-j??zyk polski' },
  { value: 'fd-swe-rus', title: 'Svenska-??????????????' },
  { value: 'fd-nld-spa', title: 'Nederlands-espa??ol' },
  { value: 'fd-swh-pol', title: 'Swahili-Polish' },
  { value: 'fd-oci-cat', title: 'Lenga d\'??c-Catal??' },
  { value: 'fd-ita-rus', title: 'italiano-??????????????' },
  { value: 'fd-fra-ell', title: 'fran??ais-????????????????' },
  { value: 'fd-eng-srp', title: 'English-Serbian' },
  { value: 'fd-fra-tur', title: 'fran??ais-T??rk??e' },
  { value: 'fd-fra-eng', title: 'French-English' },
  { value: 'fd-ita-ell', title: 'italiano-????????????????' },
  { value: 'fd-kur-eng', title: 'Kurdish-English' },
  { value: 'fd-swe-deu', title: 'Svenska-Deutsch' },
  { value: 'fd-swe-fra', title: 'Svenska-fran??ais' },
  { value: 'fd-swe-lat', title: 'Svenska-latine' },
  { value: 'fd-swe-ell', title: 'Svenska-????????????????' },
  { value: 'fd-eng-rus', title: 'English-Russian' },
  { value: 'fd-pol-por', title: 'j??zyk polski-portugu??s' },
  { value: 'fd-gla-deu', title: 'Scottish Gaelic-German' },
  { value: 'fd-eng-ita', title: 'English-Italian' },
  { value: 'fd-pol-ita', title: 'j??zyk polski-italiano' },
  { value: 'fd-fra-swe', title: 'fran??ais-Svenska' },
  { value: 'fd-isl-eng', title: '??slenska-English' },
  { value: 'fd-swe-spa', title: 'Svenska-espa??ol' },
  { value: 'fd-nno-nob', title: 'Norwegian Nynorsk-Norwegian' },
  { value: 'fd-swe-ita', title: 'Svenska-italiano' },
  { value: 'fd-fra-deu', title: 'fran??ais-Deutsch' },
  { value: 'fd-fin-ita', title: 'suomi-italiano' },
  { value: 'fd-nld-fra', title: 'Nederlands-French' },
  { value: 'fd-eng-ara', title: 'English-Arabic' },
  { value: 'fd-slk-eng', title: 'Slovak-English' },
  { value: 'fd-fra-por', title: 'fran??ais-portugu??s' },
  { value: 'fd-spa-ast', title: 'Spanish - Asturian' },
  { value: 'fd-fin-jpn', title: 'suomi-????????? (????????????)' },
  { value: 'fd-deu-ita', title: 'German-Italian' },
  { value: 'fd-swh-eng', title: 'Swahili-English' },
  { value: 'fd-fin-nor', title: 'suomi-Norsk' },
  { value: 'fd-fra-nld', title: 'French-Dutch' },
  { value: 'fd-lat-eng', title: 'Latin-English' },
  { value: 'fd-eng-bul', title: 'English-?????????????????? ????????' },
  { value: 'fd-deu-fra', title: 'Deutsch-fran??ais' },
  { value: 'fd-swe-bul', title: 'Svenska-?????????????????? ????????' },
  { value: 'fd-deu-eng', title: 'German-English' },
  { value: 'fd-pol-rus', title: 'j??zyk polski-??????????????' },
  { value: 'fd-ita-deu', title: 'Italian-German' },
  { value: 'fd-eng-gle', title: 'English-Irish' },
  { value: 'fd-swe-por', title: 'Svenska-portugu??s' },
  { value: 'fd-afr-deu', title: 'Afrikaans-German' },
  { value: 'fd-por-deu', title: 'Portuguese-German' },
  { value: 'fd-fra-bre', title: 'French-Breton' },
  { value: 'fd-san-deu', title: 'Sanskrit-German' },
  { value: 'fd-kha-deu', title: 'Khasi-German' },
  { value: 'fd-fra-rus', title: 'fran??ais-??????????????' },
  { value: 'fd-pol-ell', title: 'j??zyk polski-????????????????' }
];

class FreeDict {
  translate({ dictName, word }) {
    if (!dictSupported.has(dictName)) {
      throw new Error(`The dict "${dictName}" doesn't exist.`);
    }

    const res = spawnSync('dict', ['-d', dictName, word]);
    
    const stdout = res.stdout.toString().trim();
    if (stdout) return stdout;

    const stderr = res.stderr.toString().trim();
    if (stderr) return stderr;

    return null;
  }

  listDictionaries() {
    return languagePairsList;
  }
}

module.exports = {
  FreeDict,
}
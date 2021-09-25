#!/usr/bin/bash

sudo apt install -y build-essential nginx screen dictd

# NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 14.17.6

# Node dependencies
npm install yarn pm2 -g

# Install dictionaries.
sudo apt install -y dict-freedict-afr-deu
sudo apt install -y dict-freedict-afr-eng
sudo apt install -y dict-freedict-ara-eng
sudo apt install -y dict-freedict-bre-fra
sudo apt install -y dict-freedict-ces-eng
sudo apt install -y dict-freedict-ckb-kmr
sudo apt install -y dict-freedict-cym-eng
sudo apt install -y dict-freedict-dan-eng
sudo apt install -y dict-freedict-deu-bul
sudo apt install -y dict-freedict-deu-eng
sudo apt install -y dict-freedict-deu-fra
sudo apt install -y dict-freedict-deu-ita
sudo apt install -y dict-freedict-deu-kur
sudo apt install -y dict-freedict-deu-nld
sudo apt install -y dict-freedict-deu-pol
sudo apt install -y dict-freedict-deu-por
sudo apt install -y dict-freedict-deu-rus
sudo apt install -y dict-freedict-deu-spa
sudo apt install -y dict-freedict-deu-swe
sudo apt install -y dict-freedict-deu-tur
sudo apt install -y dict-freedict-eng-afr
sudo apt install -y dict-freedict-eng-ara
sudo apt install -y dict-freedict-eng-bul
sudo apt install -y dict-freedict-eng-ces
sudo apt install -y dict-freedict-eng-cym
sudo apt install -y dict-freedict-eng-deu
sudo apt install -y dict-freedict-eng-ell
sudo apt install -y dict-freedict-eng-fin
sudo apt install -y dict-freedict-eng-fra
sudo apt install -y dict-freedict-eng-gle
sudo apt install -y dict-freedict-eng-hin
sudo apt install -y dict-freedict-eng-hrv
sudo apt install -y dict-freedict-eng-hun
sudo apt install -y dict-freedict-eng-ita
sudo apt install -y dict-freedict-eng-jpn
sudo apt install -y dict-freedict-eng-lat
sudo apt install -y dict-freedict-eng-lit
sudo apt install -y dict-freedict-eng-nld
sudo apt install -y dict-freedict-eng-pol
sudo apt install -y dict-freedict-eng-por
sudo apt install -y dict-freedict-eng-rom
sudo apt install -y dict-freedict-eng-rus
sudo apt install -y dict-freedict-eng-spa
sudo apt install -y dict-freedict-eng-srp
sudo apt install -y dict-freedict-eng-swe
sudo apt install -y dict-freedict-eng-swh
sudo apt install -y dict-freedict-eng-tur
sudo apt install -y dict-freedict-epo-eng
sudo apt install -y dict-freedict-fin-bul
sudo apt install -y dict-freedict-fin-ell
sudo apt install -y dict-freedict-fin-eng
sudo apt install -y dict-freedict-fin-ita
sudo apt install -y dict-freedict-fin-jpn
sudo apt install -y dict-freedict-fin-nor
sudo apt install -y dict-freedict-fin-por
sudo apt install -y dict-freedict-fin-swe
sudo apt install -y dict-freedict-fra-bre
sudo apt install -y dict-freedict-fra-bul
sudo apt install -y dict-freedict-fra-deu
sudo apt install -y dict-freedict-fra-ell
sudo apt install -y dict-freedict-fra-eng
sudo apt install -y dict-freedict-fra-fin
sudo apt install -y dict-freedict-fra-ita
sudo apt install -y dict-freedict-fra-jpn
sudo apt install -y dict-freedict-fra-nld
sudo apt install -y dict-freedict-fra-pol
sudo apt install -y dict-freedict-fra-por
sudo apt install -y dict-freedict-fra-rus
sudo apt install -y dict-freedict-fra-spa
sudo apt install -y dict-freedict-fra-swe
sudo apt install -y dict-freedict-fra-tur
sudo apt install -y dict-freedict-gla-deu
sudo apt install -y dict-freedict-gle-eng
sudo apt install -y dict-freedict-gle-pol
sudo apt install -y dict-freedict-hrv-eng
sudo apt install -y dict-freedict-hun-eng
sudo apt install -y dict-freedict-isl-eng
sudo apt install -y dict-freedict-ita-deu
sudo apt install -y dict-freedict-ita-ell
sudo apt install -y dict-freedict-ita-eng
sudo apt install -y dict-freedict-ita-fin
sudo apt install -y dict-freedict-ita-jpn
sudo apt install -y dict-freedict-ita-pol
sudo apt install -y dict-freedict-ita-por
sudo apt install -y dict-freedict-ita-rus
sudo apt install -y dict-freedict-ita-swe
sudo apt install -y dict-freedict-jpn-deu
sudo apt install -y dict-freedict-jpn-eng
sudo apt install -y dict-freedict-jpn-fra
sudo apt install -y dict-freedict-jpn-rus
sudo apt install -y dict-freedict-kha-deu
sudo apt install -y dict-freedict-kha-eng
sudo apt install -y dict-freedict-kur-deu
sudo apt install -y dict-freedict-kur-eng
sudo apt install -y dict-freedict-kur-tur
sudo apt install -y dict-freedict-lat-deu
sudo apt install -y dict-freedict-lat-eng
sudo apt install -y dict-freedict-lit-eng
sudo apt install -y dict-freedict-mkd-bul
sudo apt install -y dict-freedict-nld-deu
sudo apt install -y dict-freedict-nld-eng
sudo apt install -y dict-freedict-nld-fra
sudo apt install -y dict-freedict-nld-ita
sudo apt install -y dict-freedict-nld-spa
sudo apt install -y dict-freedict-nld-swe
sudo apt install -y dict-freedict-nno-nob
sudo apt install -y dict-freedict-oci-cat
sudo apt install -y dict-freedict-pol-deu
sudo apt install -y dict-freedict-pol-ell
sudo apt install -y dict-freedict-pol-eng
sudo apt install -y dict-freedict-pol-fin
sudo apt install -y dict-freedict-pol-fra
sudo apt install -y dict-freedict-pol-gle
sudo apt install -y dict-freedict-pol-ita
sudo apt install -y dict-freedict-pol-nld
sudo apt install -y dict-freedict-pol-nor
sudo apt install -y dict-freedict-pol-por
sudo apt install -y dict-freedict-pol-rus
sudo apt install -y dict-freedict-pol-spa
sudo apt install -y dict-freedict-pol-swe
sudo apt install -y dict-freedict-por-deu
sudo apt install -y dict-freedict-por-eng
sudo apt install -y dict-freedict-por-spa
sudo apt install -y dict-freedict-san-deu
sudo apt install -y dict-freedict-slk-eng
sudo apt install -y dict-freedict-spa-ast
sudo apt install -y dict-freedict-spa-deu
sudo apt install -y dict-freedict-spa-eng
sudo apt install -y dict-freedict-spa-por
sudo apt install -y dict-freedict-srp-eng
sudo apt install -y dict-freedict-swe-bul
sudo apt install -y dict-freedict-swe-deu
sudo apt install -y dict-freedict-swe-ell
sudo apt install -y dict-freedict-swe-eng
sudo apt install -y dict-freedict-swe-fin
sudo apt install -y dict-freedict-swe-fra
sudo apt install -y dict-freedict-swe-ita
sudo apt install -y dict-freedict-swe-lat
sudo apt install -y dict-freedict-swe-pol
sudo apt install -y dict-freedict-swe-por
sudo apt install -y dict-freedict-swe-rus
sudo apt install -y dict-freedict-swe-spa
sudo apt install -y dict-freedict-swe-tur
sudo apt install -y dict-freedict-swh-eng
sudo apt install -y dict-freedict-swh-pol
sudo apt install -y dict-freedict-tur-deu
sudo apt install -y dict-freedict-tur-eng
sudo apt install -y dict-freedict-wol-fra

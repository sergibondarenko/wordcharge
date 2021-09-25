require('dotenv').config()
const express = require('express');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { FreeDict } = require('./FreeDict');

const PORT = process.env.APP_WORDCHARGE_SERVER_PORT || 3001;
const app = express();
const freeDict = new FreeDict();

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
// https://auth0.com/docs/quickstart/backend/nodejs?download=true
// Apply to a route like this: app.get('/api/endpoint', checkJwt, (req, res) => { ... })
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.APP_WORDCHARGE_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.APP_WORDCHARGE_AUTH0_AUDIENCE,
  issuer: [`https://${process.env.APP_WORDCHARGE_AUTH0_DOMAIN}/`],
  algorithms: [process.env.APP_WORDCHARGE_AUTH0_ALGORITHM]
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/api/user', checkJwt, (req, res) => {
  console.log('/api/user req.user', req.user);
  res.json({ data: req.user || null });
});

app.get('/api/freedict/translate/:dictName/:word', (req, res) => {
  try {
    const { dictName, word } = req.params;
    const data = freeDict.translate({ dictName, word });

    if (data === null) res.status(404).send('Not found');
    else res.json({ data }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/freedict/translate', (req, res) => {
  try {
    const data = freeDict.listDictionaries();
    res.json({ data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
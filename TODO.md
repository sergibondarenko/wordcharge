# TODO Prototype
- [x] Confirm the work space deletion.
- [x] Confirm the word card deletion.
- [x] Allow to put the words back if all words from space were deleted. Put a link for it in the alert.
- [x] Remeber the last selected dictionary.
- [x] Search for the work spaces.
- [x] Require title and text before saving a work space.
- [x] Redact the Readme of this repository.
- [x] Add proper license.
- [x] Add the contacts page. Or maybe just put an email link. Add a link to this github repo.
- [x] Deploy the app to the Google cloud.
- [x] Attach the wordcharge.com domain to it.
- [x] Setup local dictd server.

# TODO Production
- [ ] Show warning if approaching the local storage limit. Show error if the limit was reached. Put a link to clear the local storage.
- [ ] User auth.
  - [x] Simple user auth with Auth0.
  - [ ] User profile.
  - [ ] Protect the server API.
  - [ ] Store user IDs on the Wordhcharge server for the future use. For example, to keep user statistics, connect with the payment system, etc.\
  Probably we can use Elasticsearch to store everything.
  - [ ] TLS. Use the certbot to get a free cert.
  - [ ] Customize Auth0 auth page with Wordcharge logo.
  - [ ] One or more of your connections are currently using Auth0 development keys and should not be used in production.
- [ ] Display (for logged in users) deleted/known word cards alongside the word cards. Allow user to put the deleted words back.
- [ ] Payed subsciption. Probably we can use a payment gateway, for example, Stripe.
  - [ ] Debit and credit cards.
  - [ ] Paypal.
  - [ ] Accept cryptocurrencies.
- [ ] Google Translator API (for the paying users). It is the main reason to buy the subscription. Attention! The Google API is not free!
- [ ] Simple statistics (for the paying users) on the learned words.
- [ ] Migrate to Material v5.
- [ ] Web app translation.
- [ ] Google analytics. 
- [ ] Web browser extension. It is useful to create the work space on fly while you are surfing the Web.
- [ ] Mobile app for iOS and Android. Probably, it can be developed in React Native.
- [ ] An ETH token powered by app. You mine tokens while learning the words. 
- [ ] Some simple games with words. For example, words are falling as rain and you have to write translation to prevent it falling down.

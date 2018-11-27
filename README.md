# passport-bitrabbit-oauth2

## Install

```bash
$ npm install passport-bitrabbit-oauth2
```

## Usage

#### Create an Application

Before using `passport-bitrabbit-oauth2`, you must register an application with
Bitrabbit. 
Your application will be issued a client ID and client secret, which need to be
provided to the strategy.  You will also need to configure a redirect URI which
matches the route in your application.

#### Configure Strategy

The Bitrabbit authentication strategy authenticates users using a Bitrabbit account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Bitrabbit profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```javascript
var BitrabbitStrategy = require('passport-bitrabbit-oauth2').Strategy;

passport.use(new BitrabbitStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/bitrabbit/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ id: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'bitrabbit'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/bitrabbit',
  passport.authenticate('bitrabbit', { scope: ['profile'] }));

app.get('/auth/bitrabbit/callback', 
  passport.authenticate('bitrabbit', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  ```

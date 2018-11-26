// load moudule
const OAuth2Strategy = require('passport-oauth2')
  , util = require('util')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError


/**
 * @constructor
 * @param {object} options 
 * @param {function} verify 
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://accounts.bitrabbit.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://accounts.bitrabbit.com/oauth/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'bitrabbit';
  this._userProfileURL = options.userProfileURL || 'https://accounts.bitrabbit.com/oauth/v1/me.json';
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Bitrabbit.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `bitrabbit`
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
// var self = this;
this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    let json;
    
    if (err) {
    if (err.data) {
        try {
        json = JSON.parse(err.data);
        } catch (_) {}
    }
    if (json && json.error && json.error.message) {
        return done(new GooglePlusAPIError(json.error.message, json.error.code));
    } else if (json && json.error && json.error_description) {
        return done(new UserInfoError(json.error_description, json.error));
    }
    return done(new InternalOAuthError('Failed to fetch user profile', err));
    }
    
    try {
    json = JSON.parse(body);
    } catch (ex) {
    return done(new Error('Failed to parse user profile'));
    }
    
    const profile = {
      id: json.id,
      email: json.email,
      phoneNumber: json.phone_number || '',
      disabled: json.disabled,
      apiDisabled: json.api_disabled,
      language: json.language,
      code: json.code,
      nickName: json.nick_name
    }
    profile.provider  = 'bitrabbit';
    profile._raw = body;
    profile._json = json;
    done(null, profile);
});
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;

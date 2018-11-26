/* global describe, it, expect */
/* jshint expr: true */

var BitrabbitStrategy = require('../lib/strategy')
  , chai = require('chai');


describe('Strategy', function() {
  
  describe('constructed', function() {
    var strategy = new BitrabbitStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
    
    it('should be named bitrabbit', function() {
      expect(strategy.name).to.equal('bitrabbit');
    });
  })
  
  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new BitrabbitStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })
  
  describe('authorization request with documented parameters', function() {
    var strategy = new BitrabbitStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
    
    
    var url;
  
    before(function(done) {
      chai.passport.use(strategy)
        .redirect(function(u) {
          url = u;
          done();
        })
        .req(function(req) {
          req.session = {};
        })
        .authenticate({loginHint: 'songjian@gmail.com'});
    });
  
    it('should be redirected', function() {
      expect(url).to.equal('https://accounts.bitrabbit.com/oauth/authorize?response_type=code&client_id=ABC123');
    });
  }); // authorization request with documented parameters
  
});
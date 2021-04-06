const LocalStrategy = require('passport-local').Strategy;

// Load User model
const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (email, password, done) => {
      if (email.includes("@")) {
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
          // Match password
          let senha = md5(password);
          if (user.senha == senha) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
        });
      } else {
        User.findOne({
          username: email
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
          // Match password
          let senha = md5(password);
          if (user.senha == senha) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
        });
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
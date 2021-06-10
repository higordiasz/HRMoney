const LocalStrategy = require('passport-local').Strategy;

// Load User model
const mongoose = require('mongoose');
const webhook = require('webhook-discord');
const HookLoginSite = new webhook.Webhook("https://discord.com/api/webhooks/852596747376394270/-oT3GZENpw88GIPAraj5uSQLCv5E4hucj2RNr0wDyVRNCQM4QOHuW_3igGdSHx1vKA9T");
const User = mongoose.model('User');
const md5 = require('md5');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (email, password, done) => {
      if (email.includes("@")) {
        User.findOne({
          email: email.replace(" ", "")
        }).then(user => {
          if (!user) {
            try {
              HookLoginSite.err("HRMoney", `Tentativa de login incorreta. \nEmail: '${email}' \nSenha: '${password}'`);
            } catch { }
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
          // Match password
          let senha = md5(password);
          if (user.senha == senha) {
            try {
              HookLoginSite.success("HRMoney", `Login efetuado. \nEmail: '${email}'`);
            } catch { }
            return done(null, user);
          } else {
            try {
              HookLoginSite.err("HRMoney", `Tentativa de login incorreta. \nEmail: '${email}' \nSenha: '${password}'`);
            } catch { }
            console.log(`[TENTATIVA DE LOGIN INCORRETA] User: ${email} | Senha: ${password}`)
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
        });
      } else {
        User.findOne({
          username: email.replace(" ", "")
        }).then(user => {
          if (!user) {
            try {
              HookLoginSite.err("HRMoney", `Tentativa de login incorreta. \nEmail: '${email}' \nSenha: '${password}'`);
            } catch { }
            return done(null, false, { message: 'Usuario ou senha errado' });
          }
          // Match password
          let senha = md5(password);
          if (user.senha == senha) {
            try {
              HookLoginSite.success("HRMoney", `Login efetuado. \nEmail: '${email}'`);
            } catch { }
            return done(null, user);
          } else {
            try {
              HookLoginSite.err("HRMoney", `Tentativa de login incorreta. \nEmail: '${email}' \nSenha: '${password}'`);
            } catch { }
            console.log(`[TENTATIVA DE LOGIN INCORRETA] User: ${email} | Senha: ${password}`)
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
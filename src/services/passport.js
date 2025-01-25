const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      callbackURL: "http://localhost:3000/auth/twitter/callback", // URL configurada no Developer Portal
    },
    (token, tokenSecret, profile, done) => {
      // Lógica para salvar ou autenticar o usuário
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;

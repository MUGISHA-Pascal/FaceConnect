const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const keys = require("../keys");
const User = require("../model/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      await User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
            photo: profile._json.picture,
          }).save();
          done(null, newUser);
        }
      });
    }
  )
);

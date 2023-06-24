const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const {User} = require('../models')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb){
    const profileUser = {
      username : profile._json.name,
      email : profile._json.email,
    }
    User.findOne({email : profileUser.email}).then((user) => {
      if(!user){
        const newUser = new User(profileUser)
        newUser.save().then((fetchedUser) => {
          return cb(null,fetchedUser)
        })
      }
      return cb(null, user)
    }).catch((err) => {
      return cb(err, null)
    }) 
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/github/callback`
},
function(accessToken, refreshToken, profile, cb) {
    const profileUser = {
      username : profile._json.name,
      email : profile._json.email,
    }
    User.findOne({email : profileUser.email}).then((user) => {
      if(!user){
        const newUser = new User(profileUser)
        newUser.save().then((fetchedUser) => {
          return cb(null,fetchedUser)
        })
      }
      return cb(null, user)
    }).catch((err) => {
      return cb(err, null)
  }) 
}
));

passport.serializeUser((user,done) => {
    done(null, user)
})

passport.deserializeUser((user,done) => {
    done(null, user)
})
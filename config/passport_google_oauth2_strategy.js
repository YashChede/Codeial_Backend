const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID : "367242841656-15vhokfpnardq7dqtvdnh8sfs419668l.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://localhost:8000/users/auth/google/callback"
   },
    function(accessToken,refreshToken,profile,done){
      // profile will contain user's information
      // accesstoken same as jwt token
      // refreshtoken when accesstoken gets expire we get new token to avoid again sign in
      // initially refreshtoken is undefined until you not ask for it
      // we only sign-out from application not from google 
      // to sign-out save the accesstoken ans send request that the accesstoken is useless now or delete it from the database
      User.findOne({ email : profile.emails[0].value}).exec(function(err,user){
            if (err){
                console.log('Error in sign in google strategy',err);
                return;
            }
            if (user){
                //  if found set the user as req.user
                return done(null,user);
            }else {
                // if not found, create the user and set it as req.user(sign in that user)
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if (err){
                        console.log('Error in creating google strategy',err);
                        return;
                    }
                       return done(null,user);
                });
            }
      });
    }
));

module.exports = passport;
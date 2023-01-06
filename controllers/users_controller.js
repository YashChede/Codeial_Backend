const User = require('../models/user');
const passport = require('passport');
module.exports.profile = function(req,res){
 return res.render('users',{
    title : 'PROFILE'
 });
};

// for sign in
module.exports.signIn = function(req,res){
   if (req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_in',{
      title : 'codeial | signIn'
   });
};
 
// for sign up
module.exports.signUp = function(req,res){
   if (req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_up',{
      title : 'codeial | signUp'
   });
};

// get the sign up data
module.exports.create = function(req,res){
   if (req.body.password != req.body.confirm_password)
     return res.redirect('back');

   User.findOne({email : req.body.email},function(err,user){
     if (err){
       console.log('Error in finding the user');
       return;
     }
      if (!user){
         User.create(req.body,function(err,user){
            if (err){
             console.log('Error in creating the user');
             return;
            }
            return res.redirect('/users/signin');
         });
      }else{
         return res.redirect('back');
      }
   });
};

// sign in and create session
module.exports.createSession = function(req,res){
      return res.redirect('/');
};

// log out
module.exports.destroySession = function(req,res){
   // function is given by passport
  req.logout(function(err){
   if (err)
     return next(err);
  });
   return res.redirect('/');
}
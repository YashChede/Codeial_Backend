const User = require('../models/user');

module.exports.profile = function(req,res){
 return res.render('users',{
    title : 'PROFILE'
 });
};

// for sign in
module.exports.signIn = function(req,res){
   return res.render('user_sign_in',{
      title : 'codeial | signIn'
   });
};

// for sign up
module.exports.signUp = function(re,res){
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

};
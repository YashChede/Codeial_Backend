const User = require('../models/user');
const passport = require('passport');
const path = require('path');

// for replacing the avatar image
const fs = require('fs');

module.exports.profile = function(req,res){
  User.findById(req.params.id,function(err,user){
   return res.render('users',{
      title : 'PROFILE',
      profile_user : user
   });
  });
};

// for updation
module.exports.update = async function(req,res){
//   if (req.params.id == req.user.id){
//    // req.body == {name : req.body.name , email : req.body.email}
//    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//       req.flash('success','Updated!');
//       return res.redirect('back');
//    });
//   }else{
//    req.flash('error','Unauthorized');
//    return res.status(401).send('Unauthorized');
//   }

   if (req.params.id == req.user.id){
      try{
         let user = await User.findById(req.params.id);
         // we can not access body as it is multipart data so we require multer
         //  we use multer as storage has req also a parameter
         User.uploadedAvatar(req,res,function(err){
            if (err) console.log('MULTER error',err);
            user.name = req.body.name;
            user.email = req.body.email;
            if (req.file){

               // saving the path of the uploaded file into the avatar field in the user
               if (user.avatar){
                  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
               }

               user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            req.flash('success','Updated!');
            return res.redirect('back');
         });
      }catch (err){
        req.flash('error','not');
        return res.redirect('back');
      }

   }else {
      req.flash('error','Unauthorized');
      return res.status(401).send('Unauthorized');
   }
}

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
   req.flash('success','Logged in Successfully');
      return res.redirect('/');
};

// log out
module.exports.destroySession =  async function(req,res){
   // function is given by passport
   req.logout(function(err){
   });
    req.flash('success','You have Logged out');
  // one case pass in res as res.redirect('/',{flash : {success : "message" }});
   return res.redirect('/');
}
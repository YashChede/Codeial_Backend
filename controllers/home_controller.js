const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){

//        Post.find({},function(err,posts){
//        return res.render('home',{
//           title : "Codeial | Home",
//           posts : posts
//   });
//  });

   // populate the user
    Post.find({})
    .populate('user')
    .populate({
      path : 'comments',
      populate : {
         path : 'user'
      }
    })
    .exec(function(err,posts){
      User.find({},function(err,users){
        return res.render('home',{
           posts : posts,
           all_users : users,
           title : 'CODEIAL | HOME'
        });
      });
    });
};
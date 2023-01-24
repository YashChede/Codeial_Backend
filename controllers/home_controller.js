const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){

//        Post.find({},function(err,posts){
//        return res.render('home',{
//           title : "Codeial | Home",
//           posts : posts
//   });
//  });

   // populate the user
   try { 
    let posts =  await Post.find({})
    .populate('user')
    .populate({
      path : 'comments',
      populate : {
         path : 'user'
      }
    });
 
    let users = await User.find({});

    return res.render('home',{
      posts : posts,
      all_users : users,
      title : 'CODEIAL | HOME'
   });
  } catch(err){
    // catch any error from above
    console.log("ERROR",err);
     return;
  }
    
}; 

// without async-await
// Post.find({})
// .populate('user')
// .populate({
//   path : 'comments',
//   populate : {
//      path : 'user'
//   }
// })
// .exec(function(err,posts){
//   User.find({},function(err,users){
//     return res.render('home',{
//        posts : posts,
//        all_users : users,
//        title : 'CODEIAL | HOME'
//     });
//   });
// });

// using then 
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();
// posts.then();
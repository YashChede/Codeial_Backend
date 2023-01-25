const Post = require('../models/post');
const Comment = require('../models/comment');
const { compile } = require('ejs');

module.exports.create = async function(req,res){
   try{
    await Post.create({
    content : req.body.content,
    user : req.user._id
   });
   req.flash('success','Post Created');
   return res.redirect('back');

   } catch(err){
     req.flash('error',err);
     return res.redirect('back');
   }
//    Post.create({
//     content : req.body.content,
//     user : req.user._id
//    }, function(err,post){
//        if (err){
//         console.log('Error in creating the post');
//         return;
//        }
//        return res.redirect('back');
//    });
};

module.exports.destroy = async function(req,res){

    try {
    let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id){
         
            post.remove();
             await Comment.deleteMany({post : req.params.id});
             req.flash('success','Post ans associated comments deleted');
             return res.redirect('back');
        }else{
            req.flash('error','You cannot delete the post');
            return res.redirect('back');
        }
    } catch (err){
        req.flash('error',err);
        return res.redirect('back');
    }
    // Post.findById(req.params.id,function(err,post){
    //     // .id means converting the object id into string
    //     if (post.user == req.user.id){
         
    //         post.remove();
    //         Comment.deleteMany({post : req.params.id},function(err){
    //             return res.redirect('back');
    //         })
    //     }else{
    //         console.log('error');
    //         return res.redirect('back');
    //     }
    // });
};
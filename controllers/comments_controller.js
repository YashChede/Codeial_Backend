const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    let post = await Post.findById(req.body.post); 
      try{  
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            return res.redirect('/');
        }
    } catch (err){
        console.log('ERROR',err);
        return;
    }
    // Post.findById(req.body.post, function(err, post){
    //     if (err){
    //         console.log('Error in creating the comment');
    //         return res.redirect('back');
    //        }
    //     if (post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err, comment){
    //             // handle error

    //             post.comments.push(comment);
    //             post.save();

    //             return res.redirect('/');
    //         });
    //     }
     
    // });
};

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if (err){
            console.log('ERROR in finding the comment');
            return;
        }
        if (comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{ $pull : {comments : req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}
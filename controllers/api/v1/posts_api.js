const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    });

    return res.json(200,{
        message : "List of Posts",
        posts : posts
    })
}

module.exports.destroy = async function(req,res){

    try {
    let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
       if (post.user == req.user.id){
         
            post.remove();
             await Comment.deleteMany({post : req.params.id});

             return res.json(200,{
                message : 'Post deleted'
             });
        }else{
          return res.json(401,{
            message : 'You can not delete the post'
          })
        }
    } catch (err){
        return res.status(500).json({
            message : 'Internal server error'
        });
    }
};
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // including the array of ids of all comments in this post schema
    comments : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    } ],
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
},{
     timestamps : true,
     toJSON: {virtuals: true}
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
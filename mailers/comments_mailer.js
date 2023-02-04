const nodeMailer = require('../config/nodemailer');

// this is another way of exporting
// let newComment = /*********/
// module.exports = newComment
 exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from : 'yashchede99@gmail.com',
        to : comment.user.email,
        subject : 'New Comment',
        html : '<h1> NEW COMMENT PUBLISHED </h1>'
    }, (err,info) => {
        // info carries the information about the request has been send
        if (err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message send',info);
        return;
    });
 }
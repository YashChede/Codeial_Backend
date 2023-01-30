const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    let user = await User.findOne({email : req.body.email});
 
    if (!user || user.password!=req.body.password){
        return res.json(422,{
            message : 'Invalid Username or Password'
        })
    }
    return res.json(200,{
        message : 'Signin successfull',
        data : {
            // same key for encryption as we used in passport for descryption
            token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '100000'})
        }
    })
 };
 
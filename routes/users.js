const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/signin',userController.signIn);
router.get('/signup',userController.signUp);

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
),userController.createSession);

// google authentication
// scope is the information we want to fetch
router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',
   { failureRedirect : '/users/signin'}
),userController.createSession);

router.get('/signout',userController.destroySession);
module.exports = router;
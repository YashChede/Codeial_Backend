const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);

router.get('/signin',userController.signIn);
router.get('/signup',userController.signUp);

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
),userController.createSession);
module.exports = router;
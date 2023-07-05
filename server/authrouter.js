const router=require('express').Router();
const authController=require('./authcontroller');

router.post('/login',authController.loginController);
router.post('/signup',authController.signupController);
router.post('/logout',authController.logOutController);
module.exports=router;
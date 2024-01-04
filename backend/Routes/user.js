
const express = require("express");
const { register, login, followuser, logout, updatepassword, updateprofile, deleteuser, myprofile, 
    getalluser, getuserprofile, forgotpassword, resetpassword } = require("../Controllers/user");
const { isAuthenticated } = require("../Middleware/Auth");
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/follow/:id").get( isAuthenticated ,followuser);
router.route("/logout").get(logout)
router.route("/logout").get(logout)
router.route("/update_password").put( isAuthenticated,updatepassword)
router.route("/update_profile").put(isAuthenticated,updateprofile)
router.route("/delete_profile").delete(isAuthenticated,deleteuser)
router.route("/myprofile").get(isAuthenticated,myprofile)
router.route("/users").get(isAuthenticated,getalluser)
router.route("/users/:id").get(isAuthenticated,getuserprofile)
router.route("/forgot_password").post(forgotpassword)
router.route("/password/reset/:token").put(resetpassword)

module.exports =router;
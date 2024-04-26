const {
    register,
    login,
    setAvatar,
    getAllUsers,
} 
= require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);

//we want all users excluding our own user id
router.get("/allusers/:id",getAllUsers);

module.exports = router;
const {Router} = require("express")
const {registerUserController,
       loginUserController,
       logoutUserController,
       getUserController
    } = require("../controllers/auth.controllers")

const {authUser} = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register",registerUserController);

/**
 * @route POST /api/auth/login
 * @description  login user
 * @access Public
 */
authRouter.post("/login",loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout",logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description fetches user information
 * @access private
 */
authRouter.get("/get-me",authUser,getUserController);



module.exports = authRouter;
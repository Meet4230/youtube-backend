import { Router } from "express"
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAcountDetails,
  updateUserAvtar,
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name: "avtar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
)
router.route("/login").post(loginUser)

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshtoken").post(refreshAccessToken)
router.route("/change-password").post(changeCurrentPasswordrd)
router.route("/current-user").post(verifyJWT, getCurrentUseretCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAcountDetailsuntDetails)
router.route("/avtar").patch(verifyJWT, upload.single("avtar"), updateUserAvtar)
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

export default router

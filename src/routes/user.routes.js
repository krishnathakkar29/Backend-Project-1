import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  //upload is a middleware , this is the way to wriite middlewares
  //jo bhi method execute ho rha hai, usse just pehle middleware execute kar do
  //middleware is used , images lene ke liye
  upload.fields([
    {
      name: "avatar", //frontend mein form mein bhi naam same hona chahiye mostly
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;

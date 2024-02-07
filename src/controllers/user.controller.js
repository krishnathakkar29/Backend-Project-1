import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudiary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend , according to the model
  //validation - not empty
  //check if user already exist - username / email
  //check for images
  //check for avatar
  //upload to cloudinary, avatar check
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName, username, email, password } = req.body;
  console.log("email", email);

  if (
    [fullName, username, email, password].some((field) => field?.trim() == "")
  ) {
    return new ApiError(400, "all fields are required");
  }

  //$ sign use karke you can use many operators
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exists");
  }

  //since you have used middlewares and express gives you access to req.body , so middlewares add more field in the req
  //multer humko files ka access deta hai

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudiary(avatarLocalPath);
  const coverImage = await uploadOnCloudiary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    //avatar mein bohot saari cheezein hai, inspect it later on
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User Registered Successfully"
      ));
});

export { registerUser };

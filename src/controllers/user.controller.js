import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  //get user details from the user
  //validation -> better at backend
  //check if user already exists
  //check for images ...specially avatar
  //upload on cloudinary
  //check if avatar is uploaded or not on cloudinary
  //create user object -  entry db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { username, password, fullName, email } = req.body;
  console.log("Email is : ", email);

  if (
    [fullName, username, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //middleware adds more fields into the body , mostly all the times
  //multer gives accesss and adds files

  //console karke dekhna avatar pura
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Image is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar image needed in cloudinary");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdFinalUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdFinalUser) {
    throw new ApiError(500, "Something went wrong while regitering the user");
  }

  return res.status(201).json(
    new ApiResponse(200 , createdFinalUser , "User registered successfully"));
});

export { registerUser };

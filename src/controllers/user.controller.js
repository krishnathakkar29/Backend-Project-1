import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  res.status(201).json({
    message: "working...",
  });
});

export {registerUser}
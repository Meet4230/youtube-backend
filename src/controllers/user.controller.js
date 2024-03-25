import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating generateAcessAndRefreshToken "
    )
  }
}

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists
  // check for images
  // check for avtar
  // upload them on cloudinary, avtar
  // create user object - create entry in DB
  // check for user creation
  // return res

  const { fullName, email, password, username } = req.body
  console.log("req.body", req.body)

  if (
    [fullName, email, password, username].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (existUser) {
    throw new ApiError(409, "Username or Email already exist")
  }
  //Multer Gives access to req.files to handle images and avtar
  // On the server till , not went on cloudinary
  const avtarLocalPath = req.files?.avtar[0].path
  // const coverimageLocalPath = req.files.coverImage[0]?.path
  let coverimageLocalPath

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverimageLocalPath = req.files.coverImage[0]?.path
  }

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avtar file is required")
  }

  const avtar = await uploadOnCloudinary(avtarLocalPath)
  const coverImage = await uploadOnCloudinary(coverimageLocalPath)

  if (!avtar) {
    throw new ApiError(400, "Avtar file is required")
  }

  const user = await User.create({
    fullName,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
  // HC's
  // req body - data
  const { email, password, username } = req.body
  // email or username

  if (!email || !username) {
    throw new ApiError("username or password required")
  }
  // find user
  const user = await User.findOne({
    $or: [{ email, username }],
  })

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }
  // pasword check
  const ispasswordValid = await user.isPasswordCorrect(password)
  if (!ispasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }
  // acess refresh token , access token
  const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
    user._id
  )
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  // send secure cookies // while sending cookies need to send some options // with this cookies only be modified by server
  const options = {
    httpOnly: true,
    secure: true,
  }
  // send response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Succesfully"
      )
    )
  // MEETS
  // email,password for authenticatuion from userInput
  // generate refresh token , access token
  // remove access token
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request")
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken._id)
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is Expired Or Used")
    }

    const options = {
      httpOnly: true,
      secure: true,
    }

    const { accessToken, newRefreshToken } = await generateAcessAndRefreshToken(
      user._id
    )

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }
})

export { registerUser, loginUser, logoutUser, refreshAccessToken }

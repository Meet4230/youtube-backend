import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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

  if (
    [fullName, email, password, username].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  console.log("existUser:", existUser)

  if (existUser) {
    throw new ApiError(409, "Username or Email already exist")
  }
  //Multer Gives access to req.files to handle images and avtar
  console.log(req.files)
  // On the server till , not went on cloudinary
  const avtarLocalPath = req.files?.avtar[0].path
  const coverimageLocalPath = req.files.coverImage[0]?.path

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
    .json(new ApiResponse(200, createdUser, "User registered successfully"))
})

export { registerUser }

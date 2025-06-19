import { User } from "../models/usermodel";
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs";
import ApiErrors from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createUser = asyncHandler(async(req, res) => {
    const { username, email, fullname, password, role } = req.body;

    if(!username || !email || !fullname || !password || !role){
        throw new ApiErrors(400, "All fields are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiErrors(400, "User already exists");
    }
    const user = await User.create({
        username,
        email,
        fullname,
        password: hashedPassword,
        role
    });

    const createdUser = await User.findById(user._id).select("-password -refreshTokens");

    if (!createdUser) {
        throw new ApiErrors(400, "User not created");
    }else{
        throw ApiResponse(201, createdUser, "User created successfully")
    }


})

export {createUser}
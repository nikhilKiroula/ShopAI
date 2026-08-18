import { User } from "../models/user.model";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";


const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            throw new ApiError(400, "All fields are required");

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new ApiError(409, "User already exists");

        const user = await User.create({
            name,
            email,
            password,
        })

        return res
            .status(201)
            .json(new ApiResponse(
                201,
                user,
                "User registered successfully"
            ))

    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong")
    }
}
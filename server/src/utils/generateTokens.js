import jwt from "jsonwebtoken";

const generateAccessToken = (user)=>{
    return jwt.sign(
        {
            userId:user._id,
            role:user.role,
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"15m"
        }
    )
}


const generateRefreshToken = (user)=>{
    return jwt.sign(
        {
            userId:user._id,
        },

        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:"10d"
        }
    )
}

export { generateAccessToken, generateRefreshToken };
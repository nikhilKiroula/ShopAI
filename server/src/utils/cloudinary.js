import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath, folder = "shopai") => {
    try {
        if (!localFilePath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                folder,
                resource_type: "image",
            }
        );

        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {

        console.log(
            "Cloudinary upload error:",
            error
        );
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        

        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            return null;
        }

        const response = await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: "image",
            }
        );

        return response;
    } catch (error) {
        console.log(
            "Cloudinary delete error:",
            error.message
        );

        return null;
    }
};

export {
    uploadOnCloudinary,
    deleteFromCloudinary,
};
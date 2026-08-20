import { Address } from "../models/address.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add Address
const addAddress = asyncHandler(async (req, res) => {
    const {
        label,
        fullName,
        phone,
        addressLine,
        city,
        state,
        postalCode,
        country,
        isDefault,
    } = req.body;

    if (
        !fullName ||
        !phone ||
        !addressLine ||
        !city ||
        !state ||
        !postalCode
    ) {
        throw new ApiError(
            400,
            "All required address fields are required"
        );
    }

    if (isDefault === true) {
        await Address.updateMany(
            { user: req.user._id },
            { $set: { isDefault: false } }
        );
    }

    const address = await Address.create({
        user: req.user._id,
        label,
        fullName,
        phone,
        addressLine,
        city,
        state,
        postalCode,
        country,
        isDefault: isDefault === true,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                address,
                "Address added successfully"
            )
        );
});


// Get All Addresses
const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({
        user: req.user._id,
    }).sort({
        isDefault: -1,
        createdAt: -1,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                addresses,
                "Addresses fetched successfully"
            )
        );
});


// Get Single Address
const getAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    const address = await Address.findOne({
        _id: addressId,
        user: req.user._id,
    });

    if (!address) {
        throw new ApiError(
            404,
            "Address not found"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                address,
                "Address fetched successfully"
            )
        );
});


// Update Address
const updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    const address = await Address.findOne({
        _id: addressId,
        user: req.user._id,
    });

    if (!address) {
        throw new ApiError(
            404,
            "Address not found"
        );
    }

    const {
        label,
        fullName,
        phone,
        addressLine,
        city,
        state,
        postalCode,
        country,
        isDefault,
    } = req.body;

    if (isDefault === true) {
        await Address.updateMany(
            {
                user: req.user._id,
                _id: { $ne: addressId },
            },
            { $set: { isDefault: false } }
        );

        address.isDefault = true;
    } else if (isDefault === false) {
        address.isDefault = false;
    }

    if (label !== undefined) {
        address.label = label;
    }

    if (fullName !== undefined) {
        address.fullName = fullName;
    }

    if (phone !== undefined) {
        address.phone = phone;
    }

    if (addressLine !== undefined) {
        address.addressLine = addressLine;
    }

    if (city !== undefined) {
        address.city = city;
    }

    if (state !== undefined) {
        address.state = state;
    }

    if (postalCode !== undefined) {
        address.postalCode = postalCode;
    }

    if (country !== undefined) {
        address.country = country;
    }

    await address.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                address,
                "Address updated successfully"
            )
        );
});


// Delete Address
const deleteAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    const address = await Address.findOne({
        _id: addressId,
        user: req.user._id,
    });

    if (!address) {
        throw new ApiError(
            404,
            "Address not found"
        );
    }

    const wasDefault = address.isDefault;

    await Address.findByIdAndDelete(addressId);

    // If default address was deleted,
    // make the latest remaining address default.
    if (wasDefault) {
        const nextAddress = await Address.findOne({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        if (nextAddress) {
            nextAddress.isDefault = true;
            await nextAddress.save();
        }
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Address deleted successfully"
            )
        );
});


// Set Default Address
const setDefaultAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    const address = await Address.findOne({
        _id: addressId,
        user: req.user._id,
    });

    if (!address) {
        throw new ApiError(
            404,
            "Address not found"
        );
    }

    await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
    );

    address.isDefault = true;

    await address.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                address,
                "Default address updated successfully"
            )
        );
});

export {
    addAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};
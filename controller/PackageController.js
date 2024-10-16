const packages = require("../model/packages");
const catchAsync = require("../utils/catchAsync");


exports.packageadd = catchAsync(async (req, res) => {
    const { package_name, package_price_min, package_price_max, package_categories, package_description, package_status,package_image,package_duration, package_discount,package_people,package_availability,  } = req.body;
    const record = new packages({
        package_name, package_price_min, package_price_max, package_categories, package_description, package_status,package_image,package_duration, package_discount,package_people,package_availability
    });
    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "You have been Product successfully !!.",
        });
    } else {
        res.json({
            status: false,
            error: result,
            message: "Failed to create Product.",
        });
    }
});

exports.packageget = catchAsync(async (req, res, next) => {
    try {
        const packagegetdata = await packages.find({});
        res.status(200).json({
            data: packagegetdata,
            msg: "Package data retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching package data",
            error: error.message,
        });
    }
});


exports.packageStatusget = catchAsync(async (req, res, next) => {
    try {
        const packagegetdata = await packages.find({package_status : "active"});
        res.status(200).json({
            data: packagegetdata,
            msg: "Package data retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching package data",
            error: error.message,
        });
    }
});


exports.PackageUpdate = catchAsync(async (req, res, next) => {
    try {
        const { Id, package_name, package_price_min, package_price_max, package_categories, package_description, package_status,package_image,package_duration, package_discount,package_people,package_availability } = req.body;
        if (!Id) {
            return res.status(400).json({
                status: false,
                message: "Package ID is required.",
            });
        }
        const updatedRecord = await packages.findByIdAndUpdate(
            Id,
            {  package_name, package_price_min, package_price_max, package_categories, package_description, package_status,package_image,package_duration, package_discount,package_people,package_availability  },
            { new: true, runValidators: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({
                status: false,
                message: "packages not found!",
            });
        }
        res.status(200).json({
            status: true,
            data: updatedRecord,
            message: "packages updated successfully.",
        });

    } catch (error) {
        console.error("Error updating packages record:", error);

        res.status(500).json({
            status: false,
            message: "An error occurred while updating the packages. Please try again later.",
            error: error.message,
        });
    }
});


exports.PackageIdDelete = catchAsync(async (req, res, next) => {
    try {
        const { Id } = req.body;

        if (!Id) {
            return res.status(400).json({
                status: false,
                message: "packages ID is required.",
            });
        }

        const record = await packages.findOneAndDelete({ _id: Id });

        if (!record) {
            return res.status(404).json({
                status: false,
                message: "packages not found.",
            });
        }

        res.status(200).json({
            status: true,
            data: record,
            message: "packages deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting packages record:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error. Please try again later.",
        });
    }
});

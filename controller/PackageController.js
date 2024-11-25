const packages = require("../model/packages");
const catchAsync = require("../utils/catchAsync");
const { v4: uuidv4 } = require('uuid'); 

exports.packageadd = catchAsync(async (req, res) => {
    const {
        package_name,
        package_price_min,
        package_services,
        services_provider_phone,
        services_provider_name,
        services_provider_email,
        package_price_max,
        package_categories,
        package_description,
        package_status,
        package_image,
        package_duration,
        package_discount,
        package_people,
        package_availability,
    } = req.body;


    const updatedPackageServices = package_services.map(service => ({
        ...service,
        place_id: uuidv4() 
    }));


    const record = new packages({
        package_name,
        package_price_min,
        package_services: updatedPackageServices, 
        services_provider_phone,
        services_provider_name,
        services_provider_email,
        package_price_max,
        package_categories,
        package_description,
        package_status,
        package_image,
        package_duration,
        package_discount,
        package_people,
        package_availability,
    });

    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "Package has been successfully added!",
        });
    } else {
        res.json({
            status: false,
            error: result,
            message: "Failed to create package.",
        });
    }
});



exports.packageget = catchAsync(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalpackages = await packages.countDocuments();

        const packagegetdata = await packages.find()
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalpackages / limit);

        res.status(200).json({
            data: {
                packagegetdata: packagegetdata,
                totalpackages: totalpackages,
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalpackages = await packages.countDocuments();
        const packagegetdata = await packages.find({ package_status: "active" }).sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalpackages / limit);

        res.status(200).json({
            data: {
                packagegetdata: packagegetdata,
                totalpackages: totalpackages,
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
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
        const { Id,   package_name, package_price_min, package_services, services_provider_phone, services_provider_name, services_provider_email, package_price_max, package_categories, package_description, package_status, package_image, package_duration, package_discount, package_people, package_availability, } = req.body;
        if (!Id) {
            return res.status(400).json({
                status: false,
                message: "Package ID is required.",
            });
        }

        const updatedRecord = await packages.findByIdAndUpdate(
            Id,
            {  package_name, package_price_min, package_services, services_provider_phone, services_provider_name, services_provider_email, package_price_max, package_categories, package_description, package_status, package_image, package_duration, package_discount, package_people, package_availability, },
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


exports.PackageUpdateStatus = catchAsync(async (req, res, next) => {
    try {
        const { Id } = req.body;

        if (!Id) {
            return res.status(400).json({
                status: false,
                message: "Package ID is required.",
            });
        }

        const packageRecord = await packages.findById(Id);

        if (!packageRecord) {
            return res.status(404).json({
                status: false,
                message: "Package not found!",
            });
        }

        const newStatus = packageRecord.package_status === "active" ? "inactive" : "active";
        const newavailability = packageRecord.package_availability === "available" ? "outOfStock" : "available";
        const updatedRecord = await packages.findByIdAndUpdate(
            Id,
            {
                package_status: newStatus,
                package_availability: newavailability

            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: true,
            data: updatedRecord,
            message: `Package status updated successfully to ${updatedRecord?.package_status}.`,
        });

    } catch (error) {
        console.error("Error updating package record:", error);

        res.status(500).json({
            status: false,
            message: "An error occurred while updating the package. Please try again later.",
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
            message: "Package deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting packages record:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error. Please try again later.",
        });
    }
});


exports.PackagegetId = catchAsync(async (req, res, next) => {
    try {
        const { Id } = req.body;

        if (!Id) {
            return res.status(400).json({
                status: false,
                message: "Package ID is required.",
            });
        }
        // Fetch the current package record by ID
        const packageRecord = await packages.findById(Id);

        if (!packageRecord) {
            return res.status(404).json({
                status: false,
                message: "Package not found!",
            });
        }

        res.status(200).json({
            status: true,
            data: packageRecord,
            message: `Package status updated successfully.`,
        });

    } catch (error) {
        console.error("Error updating package record:", error);

        res.status(500).json({
            status: false,
            message: "An error occurred while updating the package. Please try again later.",
            error: error.message,
        });
    }
});

const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({

    package_name: {
        type: String,
        required: true
    },
    services_provider_name: {
        type: String,
        required: true
    },

    services_provider_email: {
        type: String,
        required: true
    },
    package_price_min: {
        type: Number,
        required: true,
        min: 0
    },
    package_price_max: {
        type: Number,
        required: true,
    },
    package_categories: {
        type: Array,
        required: true
    },
    package_description: {
        type: String,
        required: true
    },
    package_status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    package_image: {
        type: String,
        required: true
    },
    package_duration: {
        type: Number,
        required: true,
        min: 1
    },
    package_discount: {
        type: Number,
        default: 0,
        min: 0
    },
    package_people: {
        type: Number,
        required: true,
        min: 1
    },
    package_availability: {
        type: String,
        default: "available",
        enum: ["available", "outOfStock"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});


const Package = mongoose.model("Package", PackageSchema);


module.exports = Package;

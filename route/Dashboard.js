const CommonRoute = require("express").Router();

const { GarphApi, getCount, search } = require("../controller/DashboardController");

CommonRoute.get("/dashboard", getCount);

CommonRoute.get("/graph", GarphApi);

CommonRoute.post("/search", search);

module.exports = CommonRoute;
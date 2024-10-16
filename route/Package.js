const { packageadd, packageget, PackageUpdate, PackageIdDelete, packageStatusget } = require("../controller/PackageController");

const package = require("express").Router();

package.post("/package-add" , packageadd)

package.get("/package-get" , packageget);

package.post("/package-update" , PackageUpdate);

package.post("/package-delete" , PackageIdDelete);

package.get("/package-Status" , packageStatusget);



module.exports = package;
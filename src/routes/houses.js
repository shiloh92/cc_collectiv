// where the express routes are stored
const { Router } = require('express');
const addQuery = require("../controls/controller-add");
const getQuery = require("../controls/controller-get");
const removeQuery = require("../controls/controller-remove");
const existQuery = require("../controls/controller-exist");
const updateQuery = require("../controls/controller-update");


const router = Router();

router.get("/", getQuery.getHouses);
router.get("/:owner_id", getQuery.getHousesByOwnerId);
router.get("/renter/:renter_id", getQuery.getHousesByRenterId);
router.get("/assetid/:asset_id", getQuery.getHousesByAssetId);
router.get("/status/:status", getQuery.getHousesByStatus);
// router.get("/owner/:owner_id&:status", controller.getHousesByOwnerIdAndStatus);

router.post("/", addQuery.addHouse);
router.delete("/:owner_id/:asset_id", removeQuery.removeHouse);
router.put("/:asset_id", updateQuery.updateHouse);
router.put("/update/:asset_id", updateQuery.updateHouseStatus);
module.exports = router;

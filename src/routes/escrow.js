// where the express routes are stored
const { Router } = require('express');
const addQuery = require("../controls/controller-add");
const getQuery = require("../controls/controller-get");
const removeQuery = require("../controls/controller-remove");
const existQuery = require("../controls/controller-exist");
const updateQuery = require("../controls/controller-update");

const router = Router();

// paste here
router.get("/", getQuery.getEscrow);
router.get("/escrow/:id", getQuery.getEscrowByAssetId);
router.post("/escrow/:id", addQuery.addEscrow);
router.delete("/escrow/:id", removeQuery.removeEscrow);
router.put("/router/:id", updateQuery.updateEscrow);

module.exports = router;

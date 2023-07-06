// where the express routes are stored
const { Router } = require('express');
const addQuery = require("../controls/controller-add");
const getQuery = require("../controls/controller-get");
const removeQuery = require("../controls/controller-remove");
const existQuery = require("../controls/controller-exist");
const updateQuery = require("../controls/controller-update");

const router = Router();

// paste here
router.get("/", getQuery.getRewards);
router.get("/owner/:owner_id", getQuery.getRewardsByOwnerId);
router.get("/eventid/:event_id", getQuery.getRewardsByEventId);
router.post("/", addQuery.addReward);
router.delete("/:event_id", removeQuery.removeReward);


// player controlled
router.put("/:event_id", updateQuery.updateReward);

// sys controlled
router.put("/sys/:event_id", updateQuery.updateRewardBySystem);

module.exports = router;

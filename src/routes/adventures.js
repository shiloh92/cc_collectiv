// where the express routes are stored
const { Router } = require('express');
const addQuery = require("../controls/controller-add");
const getQuery = require("../controls/controller-get");
const removeQuery = require("../controls/controller-remove");
const existQuery = require("../controls/controller-exist");
const updateQuery = require("../controls/controller-update");

const router = Router();

// paste here
router.get("/", getQuery.getAdventures);
router.get("/owner/:owner_id", getQuery.getAdventuresByOwnerId);
router.get("/:team_id", getQuery.getAdventuresByTeamId);

router.post("/", addQuery.addTeamAdventure);
router.delete("/:adventure_id", removeQuery.removeAdventure);
router.put("/:adventure_id", updateQuery.updateAdventure);

module.exports = router;

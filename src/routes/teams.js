// where the express routes are stored
const { Router } = require('express');
const addQuery = require("../controls/controller-add");
const getQuery = require("../controls/controller-get");
const removeQuery = require("../controls/controller-remove");
const existQuery = require("../controls/controller-exist");
const updateQuery = require("../controls/controller-update");

const router = Router();

router.get("/", getQuery.getTeams);
router.get("/:owner_id", getQuery.getTeamsByOwnerId);
router.get("/:owner_id:team_id", getQuery.getTeamByTeamId);

router.post("/", addQuery.addTeam);

router.put("/:team_id", updateQuery.updateTeam);
router.put("/sethouse/:team_id", updateQuery.updateTeamHouse);
router.put("/setnap/:team_id", updateQuery.updateTeamNap);
router.put("/setlocation/:team_id", updateQuery.updateTeamLocation);
router.put("/setstatus/:team_id", updateQuery.updateTeamStatus);

router.delete("/:team_id", removeQuery.removeTeam);

module.exports = router;

const {
	Router
} = require('express');

// LOAD CONTROLLERS
const go_add = require("./controls/controller-add");
const go_exist = require("./controls/controller-exist");
const go_get = require("./controls/controller-get");
const go_remove = require("./controls/controller-remove");
const go_update = require("./controls/controller-update");
const router = Router();

// create all routes used for game
router.get("/zones/", go_get.getMapZones);
router.get("/", go_get.getPlayers);
router.get("/logs/", go_get.getGameLog);
// router.get("/", go_get.getTeams);
// router.get("/", go_get.getAdventures);
// router.get("/", go_get.getHouses);
// router.get("/", go_get.getRewards);
router.get("/", go_get.getEscrow);
// get individual item routes
router.get("/:id", go_get.getPlayerById);
router.get("/stats/:id", go_get.getPlayerStatsById);
// router.get("/teams/owner/:owner_id", go_get.getTeamsByOwnerId);
// router.get("/teams/:owner_id:team_id", go_get.getTeamByTeamId);
// router.get("/adventures/:team_id", go_get.getAdventuresByTeamId);
// router.get("/houses/:owner_id", go_get.getHousesByOwnerId);
// router.get("/rewards/owner/:owner_id", go_get.getRewardsByOwnerId);
// router.get("/rewards/eventid/:event_id", go_get.getRewardsByEventId);
// router.get("/escrow/:id", go_get.getEscrowByAssetId);
// add individual item routes
	router.post("/", go_add.addPlayer);
	router.post("/zones/", go_add.addZone);
	router.post("/teams/", go_add.addTeam);
	router.post("/adventures/", go_add.addTeamAdventure);
 router.post("/log/", go_add.addGameLog);

// router.post("/houses/", go_add.addHouse);
// router.post("/rewards/", go_add.addReward);
router.post("/escrow/:id", go_add.addEscrow);
// delete individual item routes
router.delete("/:id", go_remove.removePlayer);
// router.delete("/teams/:team_id", go_remove.removeTeam);
router.delete("/adventures/:team_id", go_remove.removeAdventure);
// router.delete("/houses/:owner_id/:asset_id", go_remove.removeHouse);
// router.delete("/rewards/:event_id", go_remove.removeReward);
router.delete("/escrow/:id", go_remove.removeEscrow);
// udpate individual item routes
router.put("/:id", go_update.updatePlayer);
router.put("/credits/:id", go_update.updateplayerData);
router.put("/zones/:id", go_update.updateMapZones);
router.put("/zones/ul/:id", go_update.unlockMapZoneCheck);
router.put("/zones/updatedata/:mapgrid_4/:mapgrid_16", go_update.updateMapZoneData);
router.put("/zones/updatelocale/:mapgrid_4/:mapgrid_16", go_update.updateMapZoneLocale);
router.put("/teams/sethouse/:team_id", go_update.updateTeamHouse);
router.put("/naps/:team_id", go_update.updateTeamNap);
// router.put("/adventures/:team_id", go_update.updateAdventure);
// router.put("/houses/:asset_id", go_update.updateHouse);
// router.put("/rewards/:event_id", go_update.updateReward);
router.put("/escrow/:id", go_update.updateEscrow);
module.exports = router;

// get all rows
const getGameStats = "SELECT * FROM gamestats";
const getPlayers = "SELECT * FROM players";
const getTeams = "SELECT * FROM teams";
const getAdventures = "SELECT * FROM adventures";
const getNaps = "SELECT * FROM naps";
const getHouses = "SELECT * FROM houses";
const getRewards = "SELECT * FROM rewards";
const getEscrow = "SELECT * FROM escrow";
const getMapZones = "SELECT * FROM map_zones ORDER BY mapgrid_16 ASC";
const getGameLog = "SELECT * FROM os_log ORDER BY created_at DESC";
//const getBorrowedItems = "SELECT * FROM item_lending";

module.exports = {
	getMapZones,
	getGameStats,
	getPlayers,
	getTeams,
	getAdventures,
	getNaps,
	getHouses,
	getRewards,
	getEscrow,
	getGameLog
}

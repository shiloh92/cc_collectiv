// get individual item
const getPlayerById = "SELECT * FROM players WHERE wax_id = $1";
const getPlayerStatsById = "SELECT * FROM gamestats WHERE wax_id = $1";
const getTeamsByOwnerId = "SELECT * FROM teams WHERE owner_id = $1 ORDER BY team_id DESC";
const getTeamByTeamId = "SELECT * FROM teams WHERE owner_id = $1 AND team_id = $2";
const getAdventuresByTeamId = "SELECT * FROM adventures WHERE team_id = $1";
const getAdventuresByOwnerId = "SELECT * FROM adventures WHERE owner_id = $1";
const getRewardsByOwnerId = "SELECT * FROM rewards WHERE wax_id = $1";
const getRewardsByEventId = "SELECT * FROM rewards WHERE event_id = $1";
const getHousesByOwnerId = "SELECT * FROM houses WHERE owner_id = $1";
const getHousesByOwnerIdAndStatus = "SELECT * FROM houses WHERE owner_id = $1 AND WHERE status = $2";
const getHousesByRenterId = "SELECT * FROM houses WHERE renter_id = $1";
const getHousesByAssetId = "SELECT * FROM houses WHERE asset_id = $1";
const getHousesByStatus = "SELECT * FROM houses WHERE status = $1";
const getEscrowByAssetId = "SELECT * FROM escrow WHERE asset_id = $1";

const getTeamByVehicle = "SELECT * FROM teams WHERE data -> 'vehicles' @> $1";
const getTeamByCreature = "SELECT * FROM teams WHERE data -> 'creatures' @> $1";



module.exports = {
	getPlayerById,
	getPlayerStatsById,
	getTeamsByOwnerId,
	getTeamByTeamId,
	getAdventuresByTeamId,
	getAdventuresByOwnerId,
	getRewardsByOwnerId,
	getRewardsByEventId,
	getHousesByOwnerId,
	getHousesByRenterId,
	getHousesByAssetId,
	getHousesByStatus,
	getHousesByOwnerIdAndStatus,
	getEscrowByAssetId,
	getTeamByVehicle,
	getTeamByCreature
}

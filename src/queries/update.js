
// update item
const updatePlayer = "UPDATE players SET gxp = $1, last_online = $2, nectar = $3, credits = $4 WHERE wax_id = $5";
const updateplayerData = "UPDATE players SET credits = $1 WHERE wax_id = $2";
const updateTeam = "UPDATE teams SET team_name = $1, mapgrid_4 = $2, mapgrid_16 = $3, mapgrid_256 = $4, status = $5, data = $6::JSONB WHERE team_id = $7";
const updateTeamLocation = "UPDATE teams SET mapgrid_4 = $1, mapgrid_16 = $2, mapgrid_256 = $3, nap_current = $4, status = $5 WHERE team_id = $6";
const updateTeamStatus = "UPDATE teams SET status = $1 WHERE team_id = $2";
const updateTeamNap = "UPDATE teams SET nap_current = $1, status=$2 WHERE team_id = $3";
const updateTeamHouse = "UPDATE teams SET data = jsonb_set(data, '{house}', to_jsonb($1::text), true) WHERE team_id = $2";
const updateAdventure = "UPDATE adventures SET current_steps = $1, status = $2 WHERE adventure_id = $3";
const updateHouseStatus = "UPDATE houses SET status = $2 WHERE asset_id = $1";
const updateHouse = "UPDATE houses SET renter_id = $1, price = $2, status = $3 WHERE asset_id = $4";
const updateReward = "UPDATE rewards SET status = $1 WHERE event_id = $2";
const updateRewardBySystem = "UPDATE rewards SET status = $1, disbursed_date = $2 WHERE event_id = $3";
const updateEscrow = "UPDATE escrow SET elapsed_days = $1, balance = $2, status = $3 WHERE asset_id = $4";
const updateMapZones = "UPDATE map_zones SET gxp_paid = $2 WHERE id = $1";
const unlockMapZoneCheck = "UPDATE map_zones SET status = $2 WHERE id = $1";
const updateMapZoneData = "UPDATE map_zones SET data = $3 WHERE mapgrid_4 = $1 AND mapgrid_16 = $2";
const updateMapZoneLocale = "UPDATE map_zones SET data = jsonb_set(data, '{locales, $3}', $4, FALSE) WHERE mapgrid_4 = $1 AND mapgrid_16 = $2";

module.exports = {
	updatePlayer,
	updateplayerData,
	updateTeam,
	updateTeamHouse,
	updateTeamLocation,
	updateTeamStatus,
	updateTeamNap,
	updateAdventure,
	updateHouse,
	updateHouseStatus,
	updateReward,
	updateRewardBySystem,
	updateEscrow,
	updateMapZones,
	updateMapZoneData,
	unlockMapZoneCheck,
	updateMapZoneLocale
}

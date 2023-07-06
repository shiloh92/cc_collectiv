// add individual item
// team id is auto generated, so is skipped in addTeam
const addPlayer = "INSERT INTO players (wax_id, gxp, date_joined, last_online, nectar, credits) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (wax_id) DO NOTHING";
const addTeam = "INSERT INTO teams (owner_id, team_name, mapgrid_4, mapgrid_16, mapgrid_256, nap_current, nap_total, status, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::JSONB) RETURNING team_id";
const addTeamAdventure = "INSERT INTO adventures (owner_id, team_id, init_steps, current_steps, mapgrid_4, mapgrid_16, mapgrid_256, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const addHouse = "INSERT INTO houses (owner_id, renter_id, asset_id, asset_name, price, capacity, status) VALUES ($1, $2, $3, $4,  $5, $6, $7) ON CONFLICT (asset_id) DO NOTHING";
const addReward = "INSERT INTO rewards (wax_id, event_id, type, title, description, schema, template_id, amount, created_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
const addEscrow = "INSERT INTO escrow (asset_id, owner_id, renter_id, elapsed_days, max_days, currency_type, balance, deposit, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const addZone = "INSERT INTO map_zones (mapgrid_4, mapgrid_16, zone_name, zone_type, gxp_paid, gxp_required, status) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const addGameLog = "INSERT INTO os_log (wax_id, status, type, data) VALUES ($1, $2, $3, $4);"

module.exports = {
	addPlayer,
	addTeam,
	addTeamAdventure,
	addHouse,
	addReward,
	addEscrow,
	addZone,
	addGameLog
}

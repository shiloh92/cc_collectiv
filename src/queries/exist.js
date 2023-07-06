//check if an item exists
const checkWaxIDExists = 'SELECT * FROM players WHERE wax_id = $1';
const checkHouseExists = "SELECT s FROM houses s WHERE s.asset_id = $1";
const checkTeamAdventureExists = "SELECT s FROM adventures s WHERE s.team_id = $1";
module.exports = {
	checkWaxIDExists,
	checkHouseExists,
	checkTeamAdventureExists
}

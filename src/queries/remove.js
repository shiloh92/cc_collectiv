// remove item
const removePlayer = "DELETE FROM players WHERE wax_id = $1";
const removeTeam = "DELETE from teams WHERE team_id = $1";
const removeAdventure = "DELETE from adventures WHERE adventure_id = $1 RETURNING team_id";
const removeHouse = "DELETE from houses WHERE owner_id = $1 AND asset_id= $2";
const removeReward = "DELETE from rewards WHERE event_id = $1";
const removeEscrow = "DELETE from escrow WHERE asset_id = $1";
//const removeBorrowedItem = "DELETE FROM item_lending WHERE asset_id=$1";

module.exports = {
	removePlayer,
	removeTeam,
	removeAdventure,
	removeHouse,
	removeReward,
	removeEscrow
}

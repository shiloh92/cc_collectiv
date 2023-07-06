const pool = require("../db");


const getMapZones = (req, res) => {
	pool.query(queries.getMapZones, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getGameStats = (req, res) => {
	pool.query(queries.getGameStats, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getPlayers = (req, res) => {
	pool.query(queries.getPlayers, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getTeams = (req, res) => {
	pool.query(queries.getTeams, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getAdventures = (req, res) => {
	pool.query(queries.getAdventures, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHouses = (req, res) => {
	pool.query(queries.getHouses, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getRewards = (req, res) => {
	pool.query(queries.getRewards, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getEscrow = (req, res) => {
	pool.query(queries.getEscrow, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
// get individual item
const getPlayerById = (req, res) => {
	var id = req.params.id;
	pool.query(queries.getPlayerById, [id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getPlayerStatsById = (req, res) => {
	var id = req.params.id;
	pool.query(queries.getPlayerStatsById, [id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getTeamsByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	pool.query(queries.getTeamsByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getTeamByTeamId = (req, res) => {
	var owner_id = req.params.owner_id;
	var team_id = req.params.team_id;
	pool.query(queries.getTeamByTeamId, [owner_id, team_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getAdventuresByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	pool.query(queries.getAdventuresByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getAdventuresByTeamId = (req, res) => {
	var team_id = req.params.team_id;
	pool.query(queries.getAdventuresByTeamId, [team_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getRewardsByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	pool.query(queries.getRewardsByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getRewardsByEventId = (req, res) => {
	var event_id = req.params.event_id;
	pool.query(queries.getRewardsByEventId, [event_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	// const status = req.params.status;
	pool.query(queries.getHousesByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByRenterId = (req, res) => {
	var renter_id = req.params.renter_id;
	// const status = req.params.status;
	pool.query(queries.getHousesByRenterId, [renter_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByAssetId = (req, res) => {
	var asset_id = req.params.asset_id;
	pool.query(queries.getHousesByAssetId, [asset_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByStatus = (req, res) => {
	var status = req.params.status;
	pool.query(queries.getHousesByStatus, [status], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByOwnerIdAndStatus = (req, res) => {
	var owner_id = req.params.owner_id;
	var status = req.params.status;
	pool.query(queries.getHousesByOwnerIdAndStatus, [owner_id, status], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getEscrowByAssetId = (req, res) => {
	var asset_id = req.params.asset_id;
	// const status = req.params.status;
	pool.query(queries.getEscrowByAssetId, [asset_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const addPlayer = (req, res) => {
	const {
		wax_id,
		gxp,
		date_joined,
		last_online,
		nectar,
		credits
	} = req.body; 
	pool.query(queries.addPlayer, [wax_id, gxp, date_joined, last_online, nectar, credits], (error, results) => {
		res.status(201).send("Player added successfully!");
		console.log("The player has been added.");
		return;
	});
};
//GREAT TUTORIAL:  https://www.bezkoder.com/javascript-fetch/
const addTeam = (req, res) => {
	const {
		owner_id,
		team_name,
		mapgrid_4,
		mapgrid_16,
		mapgrid_256,
		nap_current,
		nap_total,
		status
	} = req.body;
	//add to db
	pool.query(queries.addTeam, [owner_id, team_name, mapgrid_4, mapgrid_16, mapgrid_256, nap_current, nap_total, status], (error, results) => {
		res.send(results.rows[0]);
	});
	// added this
	// pool.query(queries.getTeamsByOwnerId, [owner_id], (error, results) => {
	// return res.rows[0][data];
	// });
};
const addTeamData = (req, res) => {
	const {
		owner_id,
		team_name,
		mapgrid_4,
		mapgrid_16,
		mapgrid_256,
		nap_current,
		nap_total,
		status,
		data
	} = req.body;
	//add to db
	pool.query(queries.addTeamData, [owner_id, team_name, mapgrid_4, mapgrid_16, mapgrid_256, nap_current, nap_total, status, data], (error, results) => {
		res.send(results.rows[0]);
	});
	// added this
	// pool.query(queries.getTeamsByOwnerId, [owner_id], (error, results) => {
	// return res.rows[0][data];
	// });
};
const addBorrowedItem = (req, res) => {
	const {
		owner_id,
		asset_id,
		borrower_id,
		max_days
	} = req.body;
	pool.query(queries.addBorrowedItem, [owner_id, asset_id, borrower_id, max_days], (error, results) => {
		res.status(201).send("NEW BORROW ITEM added successfully!");
		console.log("The NEW BORROW ITEM has been added.");
		return;
	})
};
const addTeamAdventure = (req, res) => {
	const {
		owner_id,
		team_id,
		init_steps,
		current_steps,
		mapgrid_4,
		mapgrid_16,
		mapgrid_256,
		status
	} = req.body;
	pool.query(queries.checkTeamAdventureExists, [team_id], (error, results) => {
		if (results.rows.length) {
			res.send("an adventure already exists for this team.");
			return;
		} else {
			pool.query(queries.addTeamAdventure, [owner_id, team_id, init_steps, current_steps, mapgrid_4, mapgrid_16, mapgrid_256, status], (error, results) => {
				res.status(201).send("NEW ADVENTURE ITEM added successfully!");
				console.log("The NEW ADVENTURE ITEM has been added.");
				return;
			});
		}
	});
};
const addTeamNap = (req, res) => {
	const {
		team_id,
		current_points,
		total_points
	} = req.body;
	//add to db
	pool.query(queries.addTeamNap, [team_id, current_points, total_points], (error, results) => {
		res.status(201).send("NEW NAP ITEM added successfully!");
		console.log("The NEW NAP ITEM has been added.");
		return;
	});
};
const addHouse = (req, res) => {
	const {
		owner_id,
		renter_id,
		asset_id,
		asset_name,
		price,
		capacity,
		status
	} = req.body;
	//check if item already exists
	pool.query(queries.checkHouseExists, [asset_id], (error, results) => {
		if (results.rows.length) {
			res.send("ITEM ID already exists.");
			return;
		}
	});
	//add to db
	pool.query(queries.addHouse, [owner_id, renter_id, asset_id, asset_name, price, capacity, status], (error, results) => {
		res.status(201).send("NEW HOUSE ITEM added successfully!");
		console.log("The NEW HOUSE ITEM has been added.");
		return;
	});
};
const addReward = (req, res) => {
	//wax_id, event_id, type, title, description, asset_id, amount, created_date
	const {
		wax_id,
		event_id,
		type,
		title,
		description,
		schema,
		template_id,
		amount,
		created_date,
		status
	} = req.body;
	//add to db
	pool.query(queries.addReward, [wax_id, event_id, type, title, description, schema, template_id, amount, created_date, status], (error, results) => {
		res.status(201).send("NEW REWARD added successfully!");
		console.log("The NEW REWARD has been added.");
		return;
	});
};
const addEscrow = (req, res) => {
	const {
		asset_id,
		owner_id,
		renter_id,
		elapsed_days,
		max_days,
		currency_type,
		balance,
		deposit,
		start_date,
		end_date,
		status
	} = req.body;
	//add to db
	pool.query(queries.addEscrow, [asset_id, owner_id, renter_id, elapsed_days, max_days, currency_type, balance, deposit, start_date, end_date, status], (error, results) => {
		res.status(201).send("NEW ESCROW added successfully!");
		console.log("The NEW ESCROW has been added.");
		return;
	});
};
const addZone = (req, res) => {
	const {
		mapgrid_4,
		mapgrid_16,
		zone_name,
		zone_type,
		gxp_paid,
		gxp_required,
		status
	} = req.body;
	//add to db
	pool.query(queries.addZone, [mapgrid_4, mapgrid_16, zone_name, zone_type, gxp_paid, gxp_required, status], (error, results) => {
		res.status(201).send("NEW ZONE added successfully!");
		console.log("The NEW ZONE has been added.");
		return;
	});
};
// remove item
const removeBorrowedItem = (req, res) => {
	const asset_id = req.params.asset_id;
	pool.query(queries.removeBorrowedItem, [asset_id], (error, results) => {
		res.status(200).send("Borrowed Item removed successfully.");
	});
};
const removePlayer = (req, res) => {
	const id = req.params.id;
	pool.query(queries.removePlayer, [id], (error, results) => {
		res.status(200).send("Player removed successfully.");
	});
};
const removeTeam = (req, res) => {
	const team_id = req.params.team_id;
	pool.query(queries.removeTeam, [team_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const removeTeamNap = (req, res) => {
	const team_id = req.params.team_id;
	pool.query(queries.removeTeamNap, [team_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const removeAdventure = (req, res) => {
	const adventure_id = req.params.adventure_id;
	pool.query(queries.removeAdventure, [adventure_id], (error, results) => {
		res.status(200).send("adventure removed successfully.");
	});
};
const removeHouse = (req, res) => {
	// const removeHouse = "DELETE from houses WHERE owner_id = $1 AND asset_id= $2";
	var owner_id = req.params.owner_id;
	var asset_id = req.params.asset_id;
	pool.query(queries.removeHouse, [owner_id, asset_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const removeReward = (req, res) => {
	var event_id = req.params.event_id;
	pool.query(queries.removeReward, [event_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const removeEscrow = (req, res) => {
	const asset_id = req.params.id;
	pool.query(queries.removeEscrow, [asset_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const updatePlayer = (req, res) => {
	const id = req.params.id;
	const {
		gxp,
		last_online,
		nectar,
		credits
	} = req.body;
	pool.query(queries.getPlayerById, [id], (error, results) => {
		const noPlayerFound = !results.rows.length;
		if (noPlayerFound) {
			res.send("Player does not exist in the database, could not update.");
		}
	});
	pool.query(queries.updatePlayer, [gxp, last_online, nectar, credits, id], (error, results) => {
		res.status(200).send("Player updated successfully.");
	});
}
const updateplayerData = (req, res) => {
	const id = req.params.id;
	const {
		credits
	} = req.body;
	pool.query(queries.updateplayerData, [credits, id], (error, results) => {
		res.status(200).send("Player credits updated successfully.");
	});
}
const updateTeam = (req, res) => {
	const team_id = req.params.team_id;
	const {
		team_name,
		mapgrid_4,
		mapgrid_16,
		mapgrid_256,
		status
	} = req.body;
	pool.query(queries.updateTeam, [team_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateTeamLocation = (req, res) => {
	const team_id = req.params.team_id;
	const {
		mapgrid_4,
		mapgrid_16,
		mapgrid_256,
		nap_current,
		status
	} = req.body;
	pool.query(queries.updateTeamLocation, [mapgrid_4, mapgrid_16, mapgrid_256, nap_current, status, team_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateTeamStatus = (req, res) => {
	const team_id = req.params.team_id;
	const {
		status
	} = req.body;
	pool.query(queries.updateTeamStatus, [team_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateTeamNap = (req, res) => {
	const team_id = req.params.team_id;
	const {
		nap_current,
		status
	} = req.body;
	pool.query(queries.updateTeamNap, [nap_current, status, team_id], (error, results) => {
		res.status(200).send("Team NAP updated successfully.");
	});
};
const updateNap = (req, res) => {
	const team_id = req.params.team_id;
	const {
		current_points
	} = req.body;
	pool.query(queries.updateNap, [current_points, team_id], (error, results) => {
		res.status(200).send("NAP updated successfully.");
	});
};
const updateAdventure = (req, res) => {
	var id = req.params.adventure_id;
	var current_steps = req.params.current_steps;
	var status = req.params.status;
	var {
		current_steps,
		status
	} = req.body;
	pool.query(queries.updateAdventure, [current_steps, status, id], (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateHouse = (req, res) => {
	var asset_id = req.params.asset_id;
	var {
		renter_id,
		price,
		status
	} = req.body;
	pool.query(queries.updateHouse, [renter_id, price, status, asset_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
//"UPDATE houses SET status = $1 WHERE asset_id = $2";
const updateHouseStatus = (req, res) => {
	var status = req.params.status;
	var asset_id = req.params.asset_id;
	var {
		status,
		asset_id
	} = req.body;
	pool.query(queries.updateHouseStatus, [asset_id, status], (error, results) => {
		res.status(200).send("HOUSE updated successfully.");
	});
};
const updateReward = (req, res) => {
	var event_id = req.params.event_id;
	var {
		status,
		event_id
	} = req.body;
	pool.query(queries.updateReward, [status, event_id], (error, results) => {
		res.status(200).send("REWARD updated successfully.");
	});
};
const updateRewardBySystem = (req, res) => {
	var event_id = req.params.event_id;
	var disbursed_date = req.params.disbursed_date;
	var status = req.params.status;
	var {
		status,
		disbursed_date,
		event_id
	} = req.body;
	pool.query(queries.updateRewardBySystem, [status, disbursed_date, event_id], (error, results) => {
		res.status(200).send("REWARD updated by sys successfully.");
	});
};
const updateEscrow = (req, res) => {
	const asset_id = req.params.id;
	const {
		elapsed_days,
		balance,
		status
	} = req.body;
	pool.query(queries.updateReward, [elapsed_days, balance, status, asset_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateMapZones = (req, res) => {
	var id = req.params.id;
	var gxp_paid = req.params.gxp_paid;
	var {
		id,
		gxp_paid
	} = req.body;
	pool.query(queries.updateMapZones, [id, gxp_paid], (error, results) => {
		res.status(200).send("GXP updated successfully.");
	});
};
const updateMapZoneData = (req, res) => {
	var mapgrid_4 = req.params.mapgrid_4;
	var mapgrid_16 = req.params.mapgrid_16;
	var data = req.params.data;
	var {
		mapgrid_4,
		mapgrid_16,
		data
	} = req.body;
	pool.query(queries.updateMapZoneData, [mapgrid_4, mapgrid_16, data], (error, results) => {
		res.status(200).send("Zone updated successfully.");
	});
};
const unlockMapZoneCheck = (req, res) => {
	var id = req.params.id;
	var status = req.params.status;
	var {
		id,
		status
	} = req.body;
	pool.query(queries.unlockMapZoneCheck, [id, status], (error, results) => {
		res.status(200).send("Zone status successfully changed.");
	});
};
const updateMapZoneLocale = (req, res) => {
	var mapgrid_4 = req.params.mapgrid_4;
	var mapgrid_16 = req.params.mapgrid_16;
	var data = req.params.data;
	var position = req.params.position;
	var {
		mapgrid_4,
		mapgrid_16,
		position,
		data
	} = req.body;
	pool.query(queries.updateMapZoneLocale, [mapgrid_4, mapgrid_16, position, data], (error, results) => {
		res.status(200).send("Locale updated successfully.");
	});
};
module.exports = {
	getMapZones,
	getGameStats,
	getPlayers,
	getTeams,
	getAdventures,
	getHouses,
	getRewards,
	getEscrow,
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
	addPlayer,
	addTeam,
	addTeamData,
	addTeamAdventure,
	addTeamNap,
	addHouse,
	addReward,
	addEscrow,
	addZone,
	addBorrowedItem,
	removePlayer,
	removeTeam,
	removeTeamNap,
	removeAdventure,
	removeHouse,
	removeReward,
	removeEscrow,
	removeBorrowedItem,
	updatePlayer,
	updateplayerData,
	updateTeam,
	updateTeamLocation,
	updateTeamStatus,
	updateTeamNap,
	updateNap,
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

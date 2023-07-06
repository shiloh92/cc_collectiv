const pool = require("../db");
const get = require("../queries/get-all");
const getby = require("../queries/get-by");

const getMapZones = (req, res) => {
	pool.query(get.getMapZones, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getGameStats = (req, res) => {
	pool.query(get.getGameStats, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getPlayers = (req, res) => {
	pool.query(get.getPlayers, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getTeams = (req, res) => {
	pool.query(get.getTeams, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getAdventures = (req, res) => {
	pool.query(get.getAdventures, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHouses = (req, res) => {
	pool.query(get.getHouses, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getRewards = (req, res) => {
	pool.query(get.getRewards, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getGameLog = (req, res) => {
	pool.query(get.getGameLog, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getEscrow = (req, res) => {
	pool.query(get.getEscrow, (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
// get individual item
const getPlayerById = (req, res) => {
	var id = req.params.id;
	pool.query(getby.getPlayerById, [id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getPlayerStatsById = (req, res) => {
	var id = req.params.id;
	pool.query(getby.getPlayerStatsById, [id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getTeamsByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	pool.query(getby.getTeamsByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getTeamByTeamId = (req, res) => {
	var owner_id = req.params.owner_id;
	var team_id = req.params.team_id;
	pool.query(getby.getTeamByTeamId, [owner_id, team_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getAdventuresByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	pool.query(getby.getAdventuresByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getAdventuresByTeamId = (req, res) => {
	var team_id = req.params.team_id;
	pool.query(getby.getAdventuresByTeamId, [team_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getRewardsByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	pool.query(getby.getRewardsByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getRewardsByEventId = (req, res) => {
	var event_id = req.params.event_id;
	pool.query(getby.getRewardsByEventId, [event_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByOwnerId = (req, res) => {
	var owner_id = req.params.owner_id;
	// const status = req.params.status;
	pool.query(getby.getHousesByOwnerId, [owner_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByRenterId = (req, res) => {
	var renter_id = req.params.renter_id;
	// const status = req.params.status;
	pool.query(getby.getHousesByRenterId, [renter_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByAssetId = (req, res) => {
	var asset_id = req.params.asset_id;
	pool.query(getby.getHousesByAssetId, [asset_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByStatus = (req, res) => {
	var status = req.params.status;
	pool.query(getby.getHousesByStatus, [status], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getHousesByOwnerIdAndStatus = (req, res) => {
	var owner_id = req.params.owner_id;
	var status = req.params.status;
	pool.query(getby.getHousesByOwnerIdAndStatus, [owner_id, status], (error, results) => {
		res.status(200).json(results.rows);
		return;
	});
};
const getEscrowByAssetId = (req, res) => {
	var asset_id = req.params.asset_id;
	// const status = req.params.status;
	pool.query(getby.getEscrowByAssetId, [asset_id], (error, results) => {
		res.status(200).json(results.rows);
		return;
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
	getGameLog
}

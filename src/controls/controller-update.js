const pool = require("../db");
const up = require("../queries/update");
const getby = require("../queries/get-by");

const updatePlayer = (req, res) => {
	const id = req.params.id;
	const {
		gxp,
		last_online,
		nectar,
		credits
	} = req.body;
	pool.query(getby.getPlayerById, [id], (error, results) => {
		const noPlayerFound = !results.rows.length;
		if (noPlayerFound) {
			res.send("Player does not exist in the database, could not update.");
		}
	});
	pool.query(up.updatePlayer, [gxp, last_online, nectar, credits, id], (error, results) => {
		res.status(200).send("Player updated successfully.");
	});
}
const updateplayerData = (req, res) => {
	const id = req.params.id;
	const {
		credits
	} = req.body;
	pool.query(up.updateplayerData, [credits, id], (error, results) => {
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
		status,
		data
	} = req.body;
	pool.query(up.updateTeam, [team_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};

// const updateTeamHouse = (req, res) => {
//
// 	const updateTeamHouse = "UPDATE teams SET data = jsonb_set(data, '{house}', to_jsonb($1::text), true) WHERE team_id = $2";
//
//
// 	const team_id = req.params.team_id;
// 	const { data } = req.body;
// 	pool.query(up.updateTeamHouse, [data.house, team_id], (error, results) => {
// 		if (error) {
// 			res.status(400).send(error);
// 		} else {
// 			res.status(200).send("Team updated successfully.");
// 		}
// 	});
// };

const updateTeamHouse = (req, res) => {
  const team_id = req.params.team_id;
  const { data } = req.body;

  // subquery to check if the house has already been assigned to another team
  const subquery = `
    SELECT COUNT(*)
    FROM teams
    WHERE data->>'house' = $1
    AND team_id != $2
  `;

  // update query with subquery condition
  const query = `
    UPDATE teams
    SET data = jsonb_set(data, '{house}', to_jsonb($1::text), true)
    WHERE team_id = $2
    AND (${subquery}) = 0
  `;

  pool.query(query, [data.house, team_id], (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send("Team updated successfully.");
    }
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
	pool.query(up.updateTeamLocation, [mapgrid_4, mapgrid_16, mapgrid_256, nap_current, status, team_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateTeamStatus = (req, res) => {
	const team_id = req.params.team_id;
	const {
		status
	} = req.body;
	pool.query(up.updateTeamStatus, [team_id], (error, results) => {
		res.status(200).send("ITEM updated successfully.");
	});
};
const updateTeamNap = (req, res) => {
	const team_id = req.params.team_id;
	const {
		nap_current,
		status
	} = req.body;
	pool.query(up.updateTeamNap, [nap_current, status, team_id], (error, results) => {
		res.status(200).send("Team NAP updated successfully.");
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
	pool.query(up.updateAdventure, [current_steps, status, id], (error, results) => {
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
	pool.query(up.updateHouse, [renter_id, price, status, asset_id], (error, results) => {
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
	pool.query(up.updateHouseStatus, [asset_id, status], (error, results) => {
		res.status(200).send("HOUSE updated successfully.");
	});
};
const updateReward = (req, res) => {
	var event_id = req.params.event_id;
	var {
		status,
		event_id
	} = req.body;
	pool.query(up.updateReward, [status, event_id], (error, results) => {
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
	pool.query(up.updateRewardBySystem, [status, disbursed_date, event_id], (error, results) => {
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
	pool.query(up.updateReward, [elapsed_days, balance, status, asset_id], (error, results) => {
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
	pool.query(up.updateMapZones, [id, gxp_paid], (error, results) => {
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
	pool.query(up.updateMapZoneData, [mapgrid_4, mapgrid_16, data], (error, results) => {
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
	pool.query(up.unlockMapZoneCheck, [id, status], (error, results) => {
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
	pool.query(up.updateMapZoneLocale, [mapgrid_4, mapgrid_16, position, data], (error, results) => {
		res.status(200).send("Locale updated successfully.");
	});
};
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

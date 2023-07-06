const pool = require("../db");
const remove = require("../queries/remove");
const up = require("../queries/update");

const removeBorrowedItem = (req, res) => {
	const asset_id = req.params.asset_id;
	pool.query(remove.removeBorrowedItem, [asset_id], (error, results) => {
		res.status(200).send("Borrowed Item removed successfully.");
	});
};
const removePlayer = (req, res) => {
	const id = req.params.id;
	pool.query(remove.removePlayer, [id], (error, results) => {
		res.status(200).send("Player removed successfully.");
	});
};
const removeTeam = (req, res) => {
	const team_id = req.params.team_id;
	pool.query(remove.removeTeam, [team_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
// const removeAdventure = (req, res) => {
// 	const adventure_id = req.params.adventure_id;
// 	pool.query(remove.removeAdventure, [adventure_id], (error, results) => {
// 		res.status(200).send("ADVENTURE removed successfully.");
// 	});
//
// // we need to set nap_current to 0, status to 'Napping' and use team_id from the removeAdventure returning result after we remove adventure
// const updateTeamNap = "UPDATE teams SET nap_current = $1, status=$2 WHERE team_id = $3";
// 	pool.query(up.updateTeamNap, [team_id], (error, results) => {
// 		res.status(200).send("ITEM updated successfully.");
// 	});
//
// };


const removeAdventure = (req, res) => {
  const adventure_id = req.params.adventure_id;
  pool.query(remove.removeAdventure, [adventure_id], (error, result) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      const team_id = result.rows[0].team_id;

      pool.query(up.updateTeamNap, [0, 'Napping', team_id], (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).send("ADVENTURE removed successfully.");
        }
      });
    }
  });
};


const removeHouse = (req, res) => {
	// const removeHouse = "DELETE from houses WHERE owner_id = $1 AND asset_id= $2";
	var owner_id = req.params.owner_id;
	var asset_id = req.params.asset_id;
	pool.query(remove.removeHouse, [owner_id, asset_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const removeReward = (req, res) => {
	var event_id = req.params.event_id;
	pool.query(remove.removeReward, [event_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
const removeEscrow = (req, res) => {
	const asset_id = req.params.id;
	pool.query(remove.removeEscrow, [asset_id], (error, results) => {
		res.status(200).send("ITEM removed successfully.");
	});
};
module.exports = {
	removePlayer,
	removeTeam,
	removeAdventure,
	removeHouse,
	removeReward,
	removeEscrow,
	removeBorrowedItem
}

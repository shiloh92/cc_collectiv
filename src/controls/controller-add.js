const pool = require("../db");
const add = require("../queries/add");
const exist = require("../queries/exist");
const getby = require("../queries/get-by");

const addPlayer = (req, res) => {
	const {
		wax_id,
		gxp,
		date_joined,
		last_online,
		nectar,
		credits
	} = req.body;

	pool.query(checkWaxIDExists, [wax_id], (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error checking if wax_id exists');
			return;
		}

		if (result.rowCount > 0) {
			res.status(409).send('Player with this wax_id already exists');
			return;
		}

		pool.query(add.addPlayer, [wax_id, gxp, date_joined, last_online, nectar, credits], (error, results) => {
			if (error) {
				console.error(error);
				res.status(500).send('Error adding player');
				return;
			}
			res.status(201).send('Player added successfully!');
			console.log('The player has been added.');
			return;
		});
	});
};



const addGameLog = (req, res) => {
	const {
	wax_id, status, type, data
	} = req.body;
  pool.query(add.addGameLog, [wax_id, status, type, data], (err, result) => {
  	 if (err) {
  			 console.error(err);
  			 res.status(500).send('Error creating a log of this game event');
  			 return;
  	 }
  	 console.log(result);
  	 res.send('Successfully created a log of this game event');
  });
};




// const addTeam = (req, res) => {
//     const {
//         owner_id,
//         team_name,
//         mapgrid_4,
//         mapgrid_16,
//         mapgrid_256,
//         nap_current,
//         nap_total,
//         status,
//         data
//     } = req.body;
//
//     // Parse the JSON data
//     const parsedData = JSON.parse(data);
//
//     // Check for duplicate assets
// 		// check if asset is already assigned to another team
//     const duplicateAssets = [];
//
//     // Check vehicle assets
//     parsedData.vehicles.forEach((vehicleId) => {
//         pool.query(get.getTeamByVehicle, [vehicleId], (error, results) => {
//             if (results.rows.length > 0) {
//                 duplicateAssets.push(`Vehicle ${vehicleId} already used in another team: ${results.rows[0].id}`);
//             }
//         });
//     });
//
//     // Check creature assets
//     parsedData.creatures.forEach((creatureId) => {
//         pool.query(get.getTeamByCreature, [creatureId], (error, results) => {
//             if (results.rows.length > 0) {
//                 duplicateAssets.push(`Creature ${creatureId} already used in another team: ${results.rows[0].id}`);
//             }
//         });
//     });
//
//     // If there are any duplicate assets, return an error message
//     if (duplicateAssets.length > 0) {
//         res.status(400).send({
//             error: duplicateAssets.join('; ')
//         });
//         return;
//     }
//
//     // If there are no duplicate assets, insert the new team
//     pool.query(add.addTeam, [owner_id, team_name, mapgrid_4, mapgrid_16, mapgrid_256, nap_current, nap_total, status, data], (error, results) => {
//         if (error) {
//             res.status(500).send({
//                 error: 'Unable to create team'
//             });
//             return;
//         }
//         res.send(results.rows[0]);
//     });
// };

const addTeam = (req, res) => {
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

    // Parse the JSON data
    const parsedData = data;
		console.log(parsedData);
    const duplicateAssets = [];

    // Check vehicle assets
    parsedData.vehicles.forEach((vehicleId) => {
			console.log("Checking vehicles before adding this team's assets to a NEW TEAM")
        pool.query(getby.getTeamByVehicle, [vehicleId], (error, results) => {
            if (results.rows.length > 0) {
                duplicateAssets.push(`Vehicle ${vehicleId} already used in another team: ${results.rows[0].id}`);
            }
        });
    });

    // Check creature assets
    parsedData.creatures.forEach((creatureId) => {
				console.log("Checking creatures before adding this team's assets to a NEW TEAM")
        pool.query(getby.getTeamByCreature, [creatureId], (error, results) => {
            if (results.rows.length > 0) {
                duplicateAssets.push(`Creature ${creatureId} already used in another team: ${results.rows[0].id}`);
            }
        });
    });

    // If there are any duplicate assets, return an error message
    if (duplicateAssets.length > 0) {
				console.log("Checking for any DUPLICATES in this team")
        res.status(400).send({
            error: duplicateAssets.join('; ')
        });
        return;
    }

    // If there are no duplicate assets, insert the new team
    pool.query(add.addTeam, [owner_id, team_name, mapgrid_4, mapgrid_16, mapgrid_256, nap_current, nap_total, status, data], (error, results) => {
        if (error) {
            res.status(500).send({
                error: 'Unable to create team'
            });
            return;
        }
        const team_id = results.rows[0].team_id; // Retrieve the team_id from the query results
        res.send(results.rows[0]);

        // Add game log entry
        const logData = {
            desc: "You created a new team.",
            team_name: team_name,
            team_id: team_id
        };
        pool.query(add.addGameLog, [owner_id, "new", "team", JSON.stringify(logData)], (error, results) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log("Game log entry added for new team.");
        });
    });
};


const addBorrowedItem = (req, res) => {
	const {
		owner_id,
		asset_id,
		borrower_id,
		max_days
	} = req.body;
	pool.query(add.addBorrowedItem, [owner_id, asset_id, borrower_id, max_days], (error, results) => {
		res.status(201).send("NEW BORROW ITEM added successfully!");
		console.log("The NEW BORROW ITEM has been added.");
		return;
	})
};
// const addTeamAdventure = (req, res) => {
//   const {
//     owner_id,
//     team_id,
//     init_steps,
//     current_steps,
//     mapgrid_4,
//     mapgrid_16,
//     mapgrid_256,
//     status
//   } = req.body;
//   console.log(req.body);
//
//   // Check if team is already assigned an adventure
//   const checkAdventureQuery = `SELECT * FROM adventures WHERE team_id = $1 AND status = 'In Progress'`;
//   pool.query(checkAdventureQuery, [team_id], (error, results) => {
//     if (error) {
//       res.status(500).send(error.message);
//       console.error(error);
//       return;
//     }
//     if (results.rows.length > 0) {
//       res.status(400).send("Team is already assigned an adventure.");
//       return;
//     }
//
//     // Add the new adventure and update team status
//     pool.query(add.addTeamAdventure, [owner_id, team_id, init_steps, current_steps, mapgrid_4, mapgrid_16, mapgrid_256, status], (error, results) => {
//       if (error) {
//         res.status(500).send(error.message);
//         console.error(error);
//         return;
//       }
//       console.log("The NEW ADVENTURE ITEM has been added.");
//       const updateTeamQuery = `UPDATE teams SET status = 'In Progress' WHERE team_id = $1`;
//       pool.query(updateTeamQuery, [team_id], (error, results) => {
//         if (error) {
//           res.status(500).send(error.message);
//           console.error(error);
//           return;
//         }
//         res.status(201).send("NEW ADVENTURE ITEM added successfully!");
//         console.log("TEAM STATUS updated successfully to IN PROGRESS");
//       });
//     });
//   });
// };

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
  console.log(req.body);

  // Check if team is already assigned an adventure
  const checkAdventureQuery = `SELECT * FROM adventures WHERE team_id = $1 AND status = 'In Progress'`;
  pool.query(checkAdventureQuery, [team_id], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
      console.error(error);
      return;
    }
    if (results.rows.length > 0) {
      res.status(400).send("Team is already assigned an adventure.");
      return;
    }

    // Add the new adventure and update team status
    pool.query(add.addTeamAdventure, [owner_id, team_id, init_steps, current_steps, mapgrid_4, mapgrid_16, mapgrid_256, status], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
        console.error(error);
        return;
      }
      console.log("The NEW ADVENTURE ITEM has been added.");
      const updateTeamQuery = `UPDATE teams SET status = 'In Progress' WHERE team_id = $1`;
      pool.query(updateTeamQuery, [team_id], (error, results) => {
        if (error) {
          res.status(500).send(error.message);
          console.error(error);
          return;
        }

        // Add game log entry
        const logData = {
          desc: "You started a new adventure.",
          location: [mapgrid_4, mapgrid_16, mapgrid_256]
        };
        pool.query(add.addGameLog, [owner_id, "new", "adventure", JSON.stringify(logData)], (error, results) => {
          if (error) {
            res.status(500).send(error.message);
            console.error(error);
            return;
          }
          console.log("Game log entry added for new adventure.");
          res.status(201).send("NEW ADVENTURE ITEM added successfully!");
          console.log("TEAM STATUS updated successfully to IN PROGRESS");
        });
      });
    });
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
	pool.query(exist.checkHouseExists, [asset_id], (error, results) => {
		if (results.rows.length) {
			res.send("ITEM ID already exists.");
			return;
		}
	});
	//add to db
	pool.query(add.addHouse, [owner_id, renter_id, asset_id, asset_name, price, capacity, status], (error, results) => {
		res.status(201).send("NEW HOUSE ITEM added successfully!");
		console.log("The NEW HOUSE ITEM has been added.");
		return;
	});
};
const addReward = (req, res) => {
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
  pool.query(add.addReward, [wax_id, event_id, type, title, description, schema, template_id, amount, created_date, status], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
      console.error(error);
      return;
    }
    res.status(201).send("NEW REWARD added successfully!");
    const logData = {
      desc: description,
      event_id: event_id,
      type: type,
      schema: schema,
      template_id: template_id,
      amount: amount
    };
    pool.query(add.addGameLog, [wax_id, "new", "reward", JSON.stringify(logData)], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
        console.error(error);
        return;
      }
      console.log("Game log entry added for new reward.");
    });
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
	pool.query(add.addEscrow, [asset_id, owner_id, renter_id, elapsed_days, max_days, currency_type, balance, deposit, start_date, end_date, status], (error, results) => {
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
	pool.query(add.addZone, [mapgrid_4, mapgrid_16, zone_name, zone_type, gxp_paid, gxp_required, status], (error, results) => {
		res.status(201).send("NEW ZONE added successfully!");
		console.log("The NEW ZONE has been added.");
		return;
	});
};

module.exports = {
	addPlayer,
	addTeam,
	addTeamAdventure,
	addHouse,
	addReward,
	addEscrow,
	addZone,
	addBorrowedItem,
	addGameLog
}

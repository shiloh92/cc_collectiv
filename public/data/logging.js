const insertLog = "INSERT INTO logs (event_type, wax_id, timestamp, additional_info) VALUES ($1, $2, $3, $4)";
const values = ["house_rental", identity.publicKey, new Date(), houseId];

pool.query(insertLog, values, (error, result) => {
  if (error) {
    // Handle error
  } else {
    // Log inserted successfully
  }
});



// CHRON JOB IS CALLED EVERY 60 DAYS TO DELETE THE LOGS THAT ARE 30 DAYS OLD
// DELETE FROM logs WHERE timestamp < NOW() - INTERVAL '30 days'

// CREATE TABLE log (
//     log_id SERIAL PRIMARY KEY,
//     event_type VARCHAR(255) NOT NULL,
//     wax_id VARCHAR(255) NOT NULL,
//     timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
//     additional_info JSONB NOT NULL
// );

// inserting into the log table example
// INSERT INTO log (event_type, wax_id, additional_info) VALUES ('rental', 'player1', '{"leaser": "player2", "asset": "House1", "duration": "3 days", "cost":"10 GXP"}');

// another example log insert
// INSERT INTO log (event_type, wax_id, additional_info)
// VALUES ('team created', '3ae82.wam', '{"overworld":0, "zone":14, "locale":241}');

//API POST CALLED
// async function logEvent(event_type, additional_info) {
//   try {
//     const waxId = await getWaxId(); // a function to get the waxId of the logged in user
//     const timestamp = new Date();
//     const data = {
//       event_type,
//       wax_id: waxId,
//       timestamp,
//       additional_info
//     }
//     const response = await axios.post('/log', data);
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }





// rewritten to use axios by chatgpt - use this one in final version! yay
// async function addPlayer() {
//   const newDate = new Date();
//   let newPlayer = {
//     wax_id: 'test.wam',
//     gxp: 0,
//     date_joined: newDate,
//     last_online: newDate,
//     nectar: 0,
//     credits: 0
//   };
//
//   try {
//     const result = await axios.post(domain_url + '/players/', newPlayer);
//     console.log("success");
//   } catch (error) {
//     console.error(error);
//   }
// }

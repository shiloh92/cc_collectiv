const {	Pool } = require('pg');
const dbk = process.env.DATABASE_URL;
const pool = new Pool({
	connectionString: dbk,
	ssl: {
		rejectUnauthorized: false
	}
});
module.exports = pool;

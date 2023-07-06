// these arrays contain all wallet items held by player
var allData = [];
var creaturesWallet=[];
var housesWallet=[];
var vehiclesWallet=[];
var itemsWallet=[];
var foodWallet=[];
var coinWallet=[];

async function fetchTable(user, collection, schema) {
	var promises = [];
	var result = [];
	var finalResult = [];
	var currentPage = 1;
	var maxPages = 3; // increase as needed during testings
	while (currentPage <= maxPages) {
		const url = 'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=' + collection + '&schema_name=' + schema + '&owner=' + user + '&page=' + currentPage + '&limit=100&order=desc&sort=asset_id';
		promises.push(await axios.get(url));
		currentPage++;
	}
	const data = await Promise.all(promises);
	data.forEach(({
		data
	}) => {
		for (n in data) {
			if (data[n].length) {
				result = [...result, data[n]];
			}
		}
		  finalResult = [].concat.apply([], result);
	});
	return finalResult;
}

async function getPlayer() {
	axios.get(url_player_init, {
		wax_id: playerData.wallet
	}).then((response) => {
		var r = response.data[0].gxp;
		playerData.GXP = Number(response.data[0].gxp);
		playerData.joinedDate = response.data[0].date_joined;
		playerData.lastOnline = response.data[0].last_online;
		playerData.nectarFuel = Number(response.data[0].nectar);
		playerData.credits = response.data[0].credits;
	}, (error) => {
		console.log(error);
	})
}



async function getAdventures() {
	var url = domain_url + '/adventures/';
	axios.get(url).then((response) => {
		allAdventures = response.data;
		return response.data;
	}, (error) => {
		console.log(error);
	})
}
async function getAdventuresByPlayer() {
	var url = domain_url + '/adventures/owner/' + playerData.wallet;
	axios.get(url).then((response) => {
		playerAdventures = response.data;
		// alert("player Advenures: "+ playerAdventures);
		return response.data;
	}, (error) => {
		console.log(error);
	})
}
async function getTeams() {
	var url = domain_url + '/teams/';
	axios.get(url).then((response) => {
		allTeams = response.data;
		return allTeams;
	}, (error) => {
		console.log(error);
	});
}
async function getPlayerTeams() {
	var teams = await getTeams();
	myTeams = [];
	allTeamsCreatures = [];
	allTeamsVehicles = [];
		for (n in teams) {
			if (teams[n].owner_id == playerData.wallet) {
				myTeams.push(teams[n]);
				allTeamsCreatures.push(teams[n].data.creatures[0])
				allTeamsVehicles.push(teams[n].data.vehicles[0])
			}
		}
		return myTeams;
}
async function getTeamAssets(teamid) {
	// this returns an array with the vehicle asset id and all creature asset ids as an array, in second element
	for (a in myTeams) {
		if (myTeams[a].team_id == teamid) {
			var team_assets = [myTeams[a].data.vehicles[0], myTeams[a].data.creatures[0]];
			return team_assets;
		}
	}
}
// creature list - team id, team name, asset id
// vehicle list - team id, team name, asset id
function getTeamVehicleData(teamid) {
	for (a in myTeams) {
		if (myTeams[a].team_id == teamid) {
			myTeams[x].data.vehicles[3]
		}
	}
}

// function getBorrowedItems() {
// 	allBorrowedItems = [];
// 	axios.get(domain_url + '/lend/').then((response) => {
// 		var data = response.data;
// 		// json stored
// 		borrowedData = data;
// 		// for (var m in data) {
// 		//   var owner = data[m].owner_id;
// 		//   var borrower = data[m].borrower_id;
// 		//   var asset_id = data[m].asset_id;
// 		//   var elapsed = data[m].elapsed_days;
// 		//   var max_days = data[m].max_days;
// 		//
// 		//   allBorrowedItems.push([owner, borrower, asset_id, elapsed, max_days]);
// 		//  }
// 	}, (error) => {
// 		console.log(error);
// 	});
// }
async function getAdventuresInfo(adventureID, infoNeeded) {
	var url = domain_url + '/adventures/' + adventureID;
	axios.get(url).then((response) => {
		var data = response.data;
		if (infoNeeded == 'team id') {
			return data.team_id;
		}
	}, (error) => {
		console.log(error);
	});
}
async function getAllHousesFromDatabase() {
	var url = domain_url + '/houses/';
	axios.get(url).then((response) => {
		dbAllHouses = response.data;
	}, (error) => {
		console.log(error);
	});
}
async function getRewards() {
	var url = domain_url + '/rewards/';
	axios.get(url).then((response) => {
		allRewards = response.data;
		return response.data;
	}, (error) => {
		console.log(error);
	})
}
async function getHousesByStatus(status) {
	var url = domain_url + '/houses/status/' + status;
	axios.get(url).then((response) => {
		switch (status) {
			case 'Listed':
				dbListedHouses = response.data;
				// callback(dbListedHouses);
				console.log(dbListedHouses);
				break;
			case 'Rented':
				dbRentedHouses = response.data;
				// callback(dbRentedHouses);
				break;
			case 'Occupied':
				dbOccupiedHouses = response.data;
				// callback(dbOccupiedHouses);
				break;
			default:
		}
		// document.getElementById(DIV_NAME_HERE).innerHTML=response;
		// update functions here
	}, (error) => {
		console.log(error);
	});
}


async function getSquareInfo(selected_locale) {
	const current_zone = await getCurrentZoneData(allZoneHolder, playerMapData.selectedOverworld, playerMapData.selectedZone);
	var locales = current_zone.data.locales;
//	return locales[selected_locale];
	for (a in locales) {
		if (locales[a] == selected_locale) {
			return locales[a];
		}
	}
}

function getZones() {
	allZones = [];
	axios.get(domain_url + '/players/zones').then((response) => {
		var data = response.data;
		for (var m in data) {
			var z_id = data[m].id;
			var mapgrid_4 = data[m].mapgrid_4;
			var mapgrid_16 = data[m].mapgrid_16;
			var name = data[m].zone_name;
			var type = data[m].zone_type;
			var bal = data[m].gxp_paid;
			var req = data[m].gxp_required;
			var status = data[m].status;
			var jsonb = data[m].data;
			zoneData = data;
			allZoneHolder.push(zoneData);
			allZones.push([z_id, mapgrid_4, mapgrid_16, name, type, bal, req, status, jsonb]);
		}
	}, (error) => {
		console.log(error);
	});
}

async function getCurrentZoneData(data, overworld_id, zone_id) {
	for (zone in data) {
		for (n in data[zone]) {
			if (data[zone][n].mapgrid_4 == overworld_id && data[zone][n].mapgrid_16 == zone_id) {
				var currentZone = data[zone][n];
				console.log(currentZone)
				return currentZone;
			}
		}
	}
}


async function loadLocalMap(data) {
	document.getElementById('mapContainer').innerHTML = "";
	var container = document.getElementById('mapContainer');
	var locales = data.data.locales;
	for (a = 0; a < 256; a++) {
		var name = locales[a].Locale_Name;
		var terrain = locales[a].Terrain;
		var tile = locales[a].Tile;
		createMapSquare('mapContainer', a, name, terrain, tile, a);
	}
}

function getLocaleSquareInfoFromJSON() {
	for (var m in zoneData) {
		if (zoneData[m].mapgrid_4 == 0 && zoneData[m].mapgrid_16 == 2) {
			var localeData = zoneData[m].data.locales;
			localeJSONB = zoneData[m].data;
			console.log(localeJSONB)
			// JSONB in db -- {"locales":[{"Tile":"sp_normal","Locale":0,"Terrain":"space","Locale_Name":"sp_normal tile"}
			for (n in localeData) {
				if (localeData[n].Locale == 211) {
					var terrain = localeData[n].Tile;
					alert(terrain);
				}
			}
		}
	}
}


async function addPlayer() {
	const newDate = new Date();
	let newPlayer = {
		"wax_id": playerData.wallet,
		"gxp": 1,
		"date_joined": newDate,
		"last_online": newDate,
		"nectar": 1,
		"credits": 3
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newPlayer)
	}
	fetch(domain_url + '/players/', options).then(result => {
		console.log('success')
	})
}
async function addHouse(owner, renter, asset, assetname, price, capacity, status) {
	// owner_id, renter_id, asset_id, asset_name, price, capacity, status
	let newHouse = {
		"owner_id": owner,
		"renter_id": renter,
		"asset_id": asset,
		"asset_name": assetname,
		"price": price,
		"capacity": capacity,
		"status": status
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newHouse)
	}
	fetch(domain_url + '/houses/', options).then(result => {
		console.log('success')
	})
}
async function addTeam() {
	let newTeam = {
		"owner_id": playerData.wallet,
		"team_name": newTeam.name,
		"mapgrid_4": 0,
		"mapgrid_16": 0,
		"mapgrid_256": 0,
		"nap_current": 0,
		"nap_total": 100,
		"status": "Napping", 
		"creatures_assigned": creatures,
		"vehicles_assigned": vehicles
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newTeam)
	}
	fetch(domain_url + '/teams/data/', options).then(response => response.json()).then(data => newTeam.created = data).then(newTeam.created => {
		//add vehicle to team
		var teamid = Number(newTeam.created.team_id);
		addTeamVehicle(teamid);
		// add creatures to team
		for (i = 0; i < newTeam.membersData.length; i++) {
			addTeamCreature(teamid, newTeam.membersData[i][1], newTeam.membersData[i][4]);
		}
		var notifications = UIkit.notification('New Team Created!', 'success');
	})
}
async function addTeamVehicle(teamid) {
	console.log('initializing adding team vehicle to db')
	// newTeam.vehiclesData.push([temp_id, asset_id, mint_num, img_ipfs, itemname, rarity, terrain, capacity]);
	console.log('db data to be passed: teamid# ' + teamid + " - " + newTeam.vehiclesData[0]);
	let newTeamVehicle = {
		"team_id": teamid,
		"asset_id": newTeam.vehiclesData[0][1],
		"asset_name": newTeam.vehiclesData[0][4],
		"capacity": newTeam.vehiclesData[0][7]
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newTeamVehicle)
	}
	fetch(domain_url + '/teams/vehicles/', options).then(result => {
		// alert('successfully added Team Vehicle to TeamID# ' + teamid);
		// alert(result.data)
	})
}
async function addTeamCreature(teamid, assetid, assetname) {
	console.log('initializing adding team creature to db')
	//newTeam.memberIDs < -- asset ids stored here
	//[temp_id, asset_id, mint_num, img_ipfs, itemname, rarity, species, description]
	let newTeamCreature = {
		"team_id": teamid,
		"asset_id": assetid,
		"asset_name": assetname
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newTeamCreature)
	}
	fetch(domain_url + '/teams/creatures/', options).then(result => {
		// alert('successfully added creature to team');
	})
}
async function addAllPlayerHouseAssetsToDatabase() {
	// if(compareInventoryCount('houses')==='NOT OK'){
	for (e in housesJSON) {
		var asset_id = Number(housesJSON[e].asset_id);
		var name = housesJSON[e].name;
		var capacity = Number(housesJSON[e].template.immutable_data.capacity);
		// var img_ipfs = json[n].data.img;
		addHouse(playerData.wallet, 'None', asset_id, name, 0, capacity, 'Available');
	}
	// } else {
	// console.log("OK! Wax Inventory = DB inventory --> skipping adding house records.");
	// }
}


async function addNickname() {
	var raw = $('#nickname_input').val();
	var san = prepInput(raw, 12);
	// console.log("new nickname: " + new_nickname);
	let newName = {
		"wax_id": playerData.wallet,
		"playerMapData.selectedAsset": playerMapData.selectedAsset,
		"new_nickname": san,
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newName)
	}
	fetch(domain_url + '/nickname/', options).then(result => {
		// console.log('success')
	})
	UIkit.modal('#modal-view-item').hide();
	var notif = UIkit.notification('Updating nickname!');
}
async function addBorrowedItem() {
	alert(playerData.wallet + ' ' + borrowerWaxWallet + ' ' + lendSelection);
	let newBorrow = {
		"owner_id": playerData.wallet,
		"borrower_id": borrowerWaxWallet,
		"asset_id": lendSelection,
		"max_days": 15
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newBorrow)
	}
	fetch(domain_url + '/lend/', options).then(result => {
		console.log('success')
	})
}
async function addLocale(mapgrid_4, mapgrid_16, mapgrid_256, locale_name, terrain, tile, special) {
	let newLocale = {
		"mapgrid_4": mapgrid_4,
		"mapgrid_16": mapgrid_16,
		"mapgrid_256": mapgrid_256,
		"locale_name": locale_name,
		"terrain": terrain,
		"tile": tile,
		"special": special
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newLocale)
	}
	fetch(domain_url + '/players/locales/', options).then(result => {
		console.log('success')
	})
}
async function addZone(grid4, grid16, name, type, paid, required, status, data) {
	let newZone = {
		"mapgrid_4": grid4,
		"mapgrid_16": grid16,
		"zone_name": name,
		"zone_type": type,
		"gxp_paid": paid,
		"gxp_required": required,
		"status": status,
		"data": data
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newZone)
	}
	fetch(domain_url + '/players/zones/', options).then(result => {
		console.log('success')
	})
}
async function addAdventure() {
	var steps = 100;
	let newAdventure = {
		"owner_id": playerData.wallet,
		"team_id": playerMapData.selectedTeam,
		"init_steps": steps,
		"current_steps": 0,
		"mapgrid_4": playerMapData.selectedOverworld,
		"mapgrid_16": playerMapData.selectedZone,
		"mapgrid_256": playerMapData.selectedLocale,
		"status": 'In Progress'
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newAdventure)
	}
	fetch(domain_url + '/adventures/', options).then(result => {
		console.log('successfully added adventure')
	})
}

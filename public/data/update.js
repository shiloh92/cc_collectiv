async function updateHouseRecord(renter, price, status) {
	// 'UPDATE houses SET renter_id = $1, price = $2, status = $3 WHERE asset_id = $4'
	var url = domain_url + '/houses/' + playerMapData.selectedAsset;
	let data = {
		"renter_id": renter,
		"price": price,
		"status": status,
		"asset_id": playerMapData.selectedAsset
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}
	fetch(url, options).then(result => {
		console.log("Update house status successful." + playerMapData.selectedAsset);
	})
	var notif = UIkit.notification('Updated status of house!');
}
async function updateRewardStatus(event_id) {
	var url = domain_url + '/rewards/' + event_id;
	let change = {
		"event_id": event_id,
		"status": "Claimed"
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}
async function updateHouseStatus(status) {
	let newHouseStatus = {
		"status": status,
		"asset_id": playerMapData.selectedAsset
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newHouseStatus)
	}
	fetch(domain_url + '/houses/updateStatus', options).then(result => {
		console.log('success')
	})
}
async function updateHouseResidents(asset_id, location, teamid, teammembers, max_capacity) {
	// location: [{"world":0, "zone":1, "locale":49}],
	// assigned_teams: [{"team_id": 27283, "team_members":9}],
	// capacity: [{"occupants":9, "max_capacity": 24}]
	var location = [0, 0, 0];
	var data = {
		"location": [{
			"world": location[0],
			"zone": location[1],
			"locale": location[2]
		}],
		"assigned_teams": [{
			"team_id": teamid,
			"team_members": [teammembers]
		}],
		"capacity": [{
			"occupants": teammembers.length,
			"max_capacity": max_capacity
		}]
	};
	let newUpdate = {
		"status": 'Occupied',
		"asset_id": asset_id,
		"data": data
	}
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUpdate)
	}
	fetch(domain_url + '/houses/updateStatus', options).then(result => {
		console.log('success')
	})
}
async function updateMapLocale(locationid, loc_name, loc_terrain, loc_tile) {
	var url = domain_url + '/players/locales/' + locationid;
	let updateLocale = {
		"locale_name": loc_name,
		"terrain": loc_terrain,
		"tile": loc_tile
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updateLocale)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}
async function updateZoneBalance(row_id, amt) {
	var newZoneBal = (amt + Number(currentzonesJson[playerMapData.selectedZone].gxp_paid)).toFixed(2);
	var url = domain_url + '/players/zones/' + row_id;
	let change = {
		"gxp_paid": newZoneBal,
		"id": row_id
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}
async function updateNap(team_id, status, points) {
	var url = domain_url + '/teams/setnap/' + team_id;
	let change = {
		"nap_current": points,
		"status": status
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}
async function updateTeamLocation(teamid, status, grid4, grid16, grid256, nap) {
	var url = domain_url + '/teams/setlocation/' + teamid;
	let change = {
		"mapgrid_4": grid4,
		"mapgrid_16": grid16,
		"mapgrid_256": grid256,
		"nap_current": nap,
		"status": status
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('successfully updated team location (' + teamid + ')')
	})
}
async function updatePlayerBalances() {
	const newDate = new Date();
	var url = domain_url + '/players/' + playerData.wallet;
	var gxp = parseFloat(playerData.GXP).toFixed(2);
	let change = {
		"gxp": gxp,
		"last_online": newDate,
		"nectar": playerData.nectarFuel,
		"credits": playerData.credits
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}
async function updateMapZoneLocale(world, zone, position, jdata) {
	// more granular control by updating the exact square in a zone
	// use other updatemap function to update entire data column for the zone
	var url = domain_url + '/players/zones/updatedata/' + world + '/' + zone;
	let change = {
		"mapgrid_4": world,
		"mapgrid_16": zone,
		"position": position,
		"data": jdata
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}
async function updateMapZoneData(world, zone, jdata) {
	var url = domain_url + '/players/zones/updatedata/' + world + '/' + zone;
	let change = {
		"mapgrid_4": world,
		"mapgrid_16": zone,
		"data": jdata
	}
	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(change)
	}
	fetch(url, options).then(result => {
		console.log('success')
	})
}

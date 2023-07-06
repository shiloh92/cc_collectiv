async function deleteHouseRecord(assetid) {
	// router.delete("/:owner_id", controller.removeHouse);
	var url = domain_url + '/houses/' + playerData.wallet + '/' + assetid;
	fetch(url, {
		method: 'DELETE'
	})
	var notif = UIkit.notification('Removed listing!');
	//  fetch(`domain_url/houses/`+asset_to_delete).then(result => {
	//        var notif = UIkit.notification('Deleted house!');
	// })
}
async function deleteTeam(teamid) {
	//playerMapData.selectedTeam
	var url = domain_url + '/teams/' + teamid;
	fetch(url, {
		method: 'DELETE'
	})
	var notif = UIkit.notification('Removed team!');
}
async function deleteTeamBySelection(teamid) {
	var url = domain_url + '/teams/' + teamid;
	fetch(url, {
		method: 'DELETE'
	})
	var notif = UIkit.notification('Removed team!');
}
async function deleteTeamCreatures(teamid) {
	//playerMapData.selectedTeam
	var url = domain_url + '/teams/creatures/' + teamid;
	fetch(url, {
		method: 'DELETE'
	})
	var notif = UIkit.notification('Removed team creatures!');
}
async function deleteTeamVehicles(teamid) {
	//playerMapData.selectedTeam
	var url = domain_url + '/teams/vehicles/' + teamid;
	fetch(url, {
		method: 'DELETE'
	})
	var notif = UIkit.notification('Removed team vehicles!');
}
async function deleteAdventure(id) {
	var url = domain_url + '/adventures/' + id;
	fetch(url, {
		method: 'DELETE'
	})
	// var notif = UIkit.notification('Removed adventure!');
}
async function removeBorrowedItem() {
	var url = domain_url + '/lend/' + lendSelection;
	fetch(url, {
		method: 'DELETE'
	})
	var notif = UIkit.notification('Lending expired! The borrower can no longer use your asset.');
}

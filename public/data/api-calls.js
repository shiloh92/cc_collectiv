var creaturesJSON = {};
var vehiclesJSON = {};
var housesJSON = {};
var itemsJSON = {};
var foodJSON = {};
var coinsJSON = {};
var selected_itemJSON = {};
var assetJSON = {};
// database data records
var dbHouses = {};
var dbListedHouses = {};
var dbRentedHouses = {};
var dbOccupiedHouses = {};
// creature skills, claims
var creatureSkillsAvailable = {};

async function refreshAllJSON() {
	api_nfts(url_creatures);
	api_nfts(url_vehicles);
	api_nfts(url_houses);
	api_nfts(url_items);
	api_nfts(url_food);
	api_nfts(url_coins);
}

async function getItemsJSON(){
  api_nfts(url_items);
	api_nfts(url_food);
	api_nfts(url_coins);
}

// this function is used to view an item up close - modal viewer
async function api_modal_itemviewer(id, callback) {
	var url = url_get_asset + id;
	axios.get(url).then(function(response) {
		selected_itemJSON = response.data.data;
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// large picture
		// name, mint number, asset id
		// description
		// stats: not available
		// close
		var image = selected_itemJSON.data.img;
		var name = selected_itemJSON.name;
		var mint = selected_itemJSON.template_mint;
		var schema = selected_itemJSON.schema.schema_name;
		var temp_id = selected_itemJSON.template.template_id;
		var rarity = selected_itemJSON.template.immutable_data.rarity;
		var assetid = selected_itemJSON.asset_id;
		var desc = selected_itemJSON.template.immutable_data.description;
		if (schema == 'creature') {
			toggleNicknameField('show');
		}; // enable nickname if creature only
		callback(selected_itemJSON);
	});
}
async function getAtomicAsset(asset, json) {
	for (a in json) {
		if (asset === json[a].asset_id) {
			return json[a];
		}
	}
}
async function getAllAtomicAssets(assets, json) {
	var result = [];
	for (n in assets) {
		const r = await getAtomicAsset(assets[n], json);
		result.push(r);
	}
	return result;
}
async function getTeamAssets(team, data) {
	// returns a shallow array of assets, starting with vehicle asset id
	console.log(data)
	var assets = [];
	for (a in data) {
		if (Number(data[a].team_id) == team) {
			var v = data[a].data.vehicles[0][0];
			var c = data[a].data.creatures[0];
			assets = c;
			//assets.unshift(v);
		}
	}
	return assets;
}

var playerAssetsByTeam = {};
async function findTeamIds(data) {
	for (n in data) {
		if (data[n].owner_id === playerData.wallet) {
			for (j in data[n].data.creatures[0]) playerAssetsByTeam[data[n].data.creatures[0][j]] = data[n].team_id;
			for (j in data[n].data.vehicles[0]) playerAssetsByTeam[data[n].data.vehicles[0][j]] = data[n].team_id;
		}
	}
	return playerAssetsByTeam;
	console.log(playerAssetsByTeam)
}

function changeItemViewerModalText() {
	var img = document.getElementById('modal-view-item-img');
	var img_url = 'https://ipfs.io/ipfs/' + selected_itemJSON.data.img
	img.setAttribute('src', img_url);
	document.getElementById('header-view-item').innerText = selected_itemJSON.name + " #" + selected_itemJSON.template_mint;
	document.getElementById('modal-view-item-assetid').innerText = "ASSET ID#: " + selected_itemJSON.asset_id;
	document.getElementById('modal-view-item-desc').innerText = selected_itemJSON.template.immutable_data.description;
	// if nickname exists for creature, display it
	if (selected_itemJSON.data.nickname) {
		document.getElementById('header-view-item').innerText = selected_itemJSON.name + " - '" + selected_itemJSON.data.nickname + "' #" + selected_itemJSON.template_mint;
	}
}

function changeListHouseModalText() {
	var img = document.getElementById('lfr-item-img');
	var img_url = 'https://ipfs.io/ipfs/' + selected_itemJSON.data.img
	img.setAttribute('src', img_url);
	// resize the image a bit
	img.style.height = "50%";
	img.style.width = "50%";
	document.getElementById('lfr-header').innerText = "List for Rent: " + selected_itemJSON.name + " (#" + selected_itemJSON.template_mint + ")";
	document.getElementById('lfr-asset-info').innerText = "AssetID#" + selected_itemJSON.asset_id;
	document.getElementById('lfr-asset-desc').innerText = selected_itemJSON.template.immutable_data.description + ". Room for " + selected_itemJSON.template.immutable_data.capacity + " creatures.";
}
async function api_get_asset(id) {
	var url = url_get_asset + id;
	axios.get(url).then(function(response) {
		assetJSON = response.data.data;
		var capacity = assetJSON.data.capacity;
		var mint = assetJSON.template_mint;
		var img_ipfs = assetJSON.data.img;
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// always executed
	});
}
async function api_creatures() {
	console.log(url_creatures + ' being accessed.')
	axios.get(url_creatures).then((response) => {
		creaturesJSON = response.data.data;
		return creaturesJSON;
	}, (error) => {
		console.log(error);
	});
}

function api_houses(callback) {
	axios.get(url_houses).then(function(response) {
		housesJSON = response.data.data;
		callback(housesJSON);
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// executes at end
	});
}

function api_vehicles(callback) {
	axios.get(url_vehicles).then(function(response) {
		vehiclesJSON = response.data.data;
		console.log(vehiclesJSON)
		callback(vehiclesJSON);
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// executes at end
	});
}

function api_items(callback) {
	axios.get(url_items).then(function(response) {
		itemsJSON = response.data.data;
		callback(itemsJSON);
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// executes at end
	});
}
// GET ALL NFTS BY SCHEMA
var houses_url_atomic = wax_endpoint + '/atomicassets/v1/assets?collection_name=cutecrushies&schema_name=houses&page=1&limit=100&order=desc&sort=asset_id';
var allHousesAtomic = {};

function api_all_nfts(url) {
	axios.get(url).then(function(response) {
		if (url == houses_url_atomic) {
			allHousesAtomic = response.data.data;
		}
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// executes at end
	});
}
// GET NFT API CALLS
async function api_nfts(url) {
	axios.get(url).then(function(response) {
		if (url == url_creatures) {
			creaturesJSON = response.data.data;
		}
		if (url == url_vehicles) {
			vehiclesJSON = response.data.data;
		}
		if (url == url_houses) {
			housesJSON = response.data.data;
		}
		if (url == url_items) {
			itemsJSON = response.data.data;
		}
		if (url == url_food) {
			foodJSON = response.data.data;
		}
		if (url == url_coins) {
			coinsJSON = response.data.data;
		}
	}).catch(function(error) {
		// console.log(error);
	}).then(function() {
		// executes at end
	});
}

function clearPreviousList(div) {
	var selectedDiv = "#" + div;
	$(selectedDiv).empty();
}
async function createListForHouses(json, div, rowname) {
	for (n in json) {
		var owner = json[n].owner_id;
		var renter = json[n].renter_id;
		var assetid = json[n].asset_id;
		var asset = parseInt(assetid, 10);
		var name = json[n].asset_name;
		var price = json[n].price;
		var status = json[n].status;
		if (renter == null) {
			renter = "None";
		};
		if (price == null) {
			price = 0;
		};
		// load image ipfs, mint, capacity from atomic assets api
		var blockchain_data = await getHouseData(asset);
		var img_ipfs = await blockchain_data[0];
		var mint = await blockchain_data[1];
		var capacity = await blockchain_data[2];
		var title = getItemTitle(name, mint);
		//assetid, capacity, owner, price
		var content = [assetid, capacity, owner, price];
		switch (rowname) {
			case 'borrowed':
				if (renter == playerData.wallet) {
					// houses the player is renting from another player
					createListItem('houses renting', div, assetid + rowname, img_ipfs, title, content);
					insertButton('buttons_container' + assetid + rowname, 'Cancel Rental', assetid + 'borrowing');
					changeListItemBg(assetid + rowname, '#e8b7f7');
				}
				break;
			case 'rented':
				if (owner == playerData.wallet) {
					// houses the player is renting to someone and they are occupied by someone
					// assetid, capacity, owner, renter, price
					content = [assetid, capacity, owner, renter, price];
					createListItem('houses rented out', div, assetid + rowname, img_ipfs, title, content);
					insertButton('buttons_container' + assetid + rowname, 'Cancel Rental', assetid + 'lending');
					changeListItemBg(assetid + rowname, '#d0d8e0');
				}
				break;
			default:
				// items listed on marketplace are all displayed
				createListItem('houses listed', div, assetid + rowname, img_ipfs, title, content);
				if (owner == playerData.wallet) {
					insertButton('buttons_container' + assetid + rowname, 'Remove Listing', assetid + 'playerlisted');
					changeListItemBg(assetid + rowname, '#f9f4b8');
				} else if (!owner == playerData.wallet) {
					insertButton('buttons_container' + assetid + rowname, 'Rent House', assetid + 'nonplayerlisted');
				}
		}
	}
}
async function createNewListForTeamCreation(json, div) {
	// in order to know which vehicles or creatures already in a team
	// getTeamVehicles();
	// getTeamCreatures();
	for (n in json) {
		var asset_owner = json[n].owner;
		var name = json[n].name;
		var schema = json[n].schema.schema_name;
		var temp_id = json[n].template.template_id;
		var mint = json[n].template_mint;
		var assetid = json[n].asset_id;
		var rarity = json[n].template.immutable_data.rarity;
		var desc = json[n].template.immutable_data.description;
		var img_ipfs = json[n].data.img;
		var title = getItemTitle(name, mint);
		if (schema == "creature") {
			var species = json[n].template.immutable_data.species;
			if (temp_id == '152219') {
				img_ipfs = './images/fixes/152219.gif'
			}
			if (temp_id == '552415') {
				img_ipfs = './images/fixes/552415.gif'
			}
			//assetid, species, status, team
			var content = [assetid, species, 'Available', 'No Team'];
			// 4-15-22 REFACTOR MAJOR CHANGES
			// RE ENABLE AFTER REFACTORING, this part is BROKEN FOR NOW - CREATURES WILL SHOW UP EVEN IF THEY ARE ALREADY IN A TEAM!
			// Condition: is in team?
			//      var assetIDArray = [];
			//      var teamIDArray = [];
			//      for(a in allTeamsCreatures){
			//        assetIDArray.push(allTeamsCreatures[a].asset_id);
			//        teamIDArray.push(allTeamsCreatures[a].team_id);
			//      }
			// var isinTeam = assetIDArray.includes(assetid);
			//
			// if(!isinTeam){
			createListItem('creatures', div, assetid + 'item', img_ipfs, title, content);
			insertButton(assetid + 'item', 'Add to Team', assetid);
			// }
		}
	}
}


async function burnAsset(assetid, callback) {
    console.log("Burn asset wax function clicked" + wax.userAccount);
    try {
      const result = await wax.api.transact({
        actions: [{
            account: 'atomicassets',
            name: 'burnasset',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                asset_owner: wax.userAccount,
                asset_id: assetid,
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 1200,
    });
      var res = await result;
      alert("Burn TX # " + res.transaction_id);
      callback(true)
      return true;
          } catch(e) {
            console.log("Could not complete tx : " + e.message );
            callback(false)
            return e.message;
          }
}


async function transferAsset(assetid, sendToWaxId) {
    UIkit.modal('#modal-tf-asset').hide();
    const result = await wax.api.transact({
        actions: [{
            account: 'atomicassets',
            name: 'transfer',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                from: wax.userAccount,
                to: sendToWaxId,
                asset_ids: [assetid],
                memo: "Transfer"
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 1200,
    });

}

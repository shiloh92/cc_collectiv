var mapEditorQueue = [];
var setLocaleName = "undefined";
var setLocaleTile = "undefined";
var setLocaleLandType = "undefined";
var randomLocaleNames = "false";
var mapEditorEnable = false;
// random names for mixing
var grasses = ["Grassy Hills", "Purring Plains", "Butterfly Fields", "Happy Plains", "Picnic Valley", "Summerwind Valley", "Bird Song Hills", "Morningcheer Hills"];
var forests = ["Spooky", "Whispers", "Mushbrooms", "Creaky", "Dewdrop", "Spiderweb", "Old Branch", "Shadowy", "Scratchingpost", "Monkeydream", "Birdbirch", "Perching Pine", "Howling Oaks", "Caterpillar", "Barking Birch", "Fairy Elm", "Creaking Elm", "Creaking Timber", "Mister E.", "Mumbling Mosquito", "Mossy", "Berrytree", "Sneakytree", "Run-n-Hide", "Tangleknot", "Wovensilk", "Spiderking", "Green Wizard's", "Screeching Timber"];
var waters = ["Calm Waters", "Gentlebubbles Pond", "Mooshy Marshes", "Pleasant Pond", "Easy Sailing Lake", "Beachball Beach", "Soggy Britches Lake", "Mildew Marsh", "Cat Tails Marsh", "Cat Tails Cove", "Sunbeam Shore"];
var castles = ["Shakyknees", "Tremblewhisker", "Saberfang", "Fleefoot", "Moonhowl", "Stayaway", "Dangerzone", "Afraidmore", "Oh-no", "Hiccup"];
var ruins = ["Mossy", "Dusty", "Rubbish", "Foggy", "Dewdust", "Old Castle", "Small Castle", "Large Castle"];
var towns = ["Leaky Roof", "Gentle", "Happy", "Sweet Sunny", "Summerwake", "Truewishes", "Fisher\'s", "Barron\'s", "Redlond", "Kistal", "Seamont", "King", "Tinroof", "Wetbarrel"];
// TROPIC LOCATION NAMES
var tr_castles = ["Sammba", "Kal-la-la", "Jiggy", "Sunnybeach", "Summershine"];
var tr_islands = ["Coconutty", "Softee Sand", "Silkspell", "Cheerful", "Gleebloom", "Beachball", "Cocktail", "Tangerhyme", "Blueski", "Dreamy", "White Whale"];
var tr_waterlands = ["Sharcana", "Turtlesh", "Lagoonka", "Shellkelesh", "Eelkwesh"];
var tr_water = ["Starry", "Shiny", "Easy", "Calm"];
// DESERT LOCATION NAMES
var ds_castles = ["Messterious", "Empty", "Abandoned", "Whatch-Yer-Step", "No Chill", "Dusty Bucket", "Cracker Dupe", "Dust Haven"];
var ds_dirt = ["Dusty Plains", "Snake Hole Valley", "Cactus Plains", "Nothing-to-See Valley", "Eh Plains"];
var ds_dunes = ["Rolling", "Tumble", "Frenly", "Sunny"];
var ds_ruins = ["Dusty", "Orange Dust", "Red Dust", "Old", "Small", "Large"];
var ds_towns = ["Friendly", "Mining", "Quiet", "Small"];
// SPACE LOCATION NAMES
var sp_space = ["Normal", "Casual", "Starry", "Starry", "Empty"];
var sp_gasfields = ["Strange Gas", "Space-Genius", "Funky", "Glowing Gas", "Gas"];
var sp_stations = ["Star", "Orbital", "Crushie Space", "Trade"];
var sp_debris = ["Ship Debris", "Station Debris", "Unknown Objects"];
var sp_planets = ["Vibrant", "Exciting", "Calm", "Moodyweather", "Relaxy"];

function getRandomName(array) {
	var x = array[Math.round(Math.random() * (array.length - 1))];
	return x;
}

function toggleMapEditor() {
	if (document.getElementById('mapEditorActivateCheckbox').checked) {
		mapEditorEnable = true;
	} else if (!document.getElementById('mapEditorActivateCheckbox').checked) {
		mapEditorEnable = false;
	}
}

function setLandType() {
	if (document.getElementById('mapEditorTileTypeLand').checked) {
		setLocaleLandType = "land";
	} else if (document.getElementById('mapEditorTileTypeWater').checked) {
		setLocaleLandType = "water";
	} else if (document.getElementById('mapEditorTileTypeSpace').checked) {
		setLocaleLandType = "space";
	}
}


function createNewLocaleName(currentTile) {
  let setLocaleName;

  switch (currentTile) {
    case 'grassplains':
      setLocaleName = getRandomName(grasses);
      break;
    case 'water':
      setLocaleName = getRandomName(waters);
      break;
    case 'forest':
      setLocaleName = getRandomName(forests) + " Forest";
      break;
    case 'castle':
      setLocaleName = getRandomName(castles) + " Castle";
      break;
    case 'town':
      setLocaleName = getRandomName(towns) + " Town";
      break;
    case 'ruins':
      setLocaleName = getRandomName(ruins) + " Ruins";
      break;
    case 'tr_water':
      setLocaleName = getRandomName(tr_water) + " Waters";
      break;
    case 'tr_island':
      setLocaleName = getRandomName(tr_islands) + " Island";
      break;
    case 'tr_waterland':
      setLocaleName = getRandomName(tr_waterlands) + " Waterland";
      break;
    case 'tr_castle':
      setLocaleName = getRandomName(tr_castles) + " Longhouse";
      break;
    case 'ds_dirt':
      setLocaleName = getRandomName(ds_dirt);
      break;
    case 'ds_dunes':
      setLocaleName = getRandomName(ds_dunes) + " Dunes";
      break;
    case 'ds_ruins':
      setLocaleName = getRandomName(ds_ruins) + " Ruins";
      break;
    case 'ds_castle':
      setLocaleName = getRandomName(ds_castles) + " Fortress";
      break;
    case 'ds_town':
      setLocaleName = getRandomName(ds_towns) + " Town";
      break;
    case 'sp_normal':
      setLocaleName = getRandomName(sp_space) + " Space";
      break;
    case 'sp_debris':
      setLocaleName = getRandomName(sp_debris);
      break;
    case 'sp_gas1':
      setLocaleName = getRandomName(sp_gasfields) + " Field";
      break;
    case 'sp_station1':
      setLocaleName = getRandomName(sp_stations) + " Station";
      break;
    case 'sp_gplanet1':
    case 'sp_dplanet1':
    case 'sp_rplanet1':
    case 'sp_iplanet1':
      setLocaleName = getRandomName(sp_planets) + " Planet";
      break;
  }

  return setLocaleName;
}


function updateMapEditorSettings() {
	setLocaleName = document.querySelector('#mapEditorLocaleName').value;
	const randomNamesCheckbox = document.getElementById('mapEditorRandomNamesCheckbox');
	const tileOptionsWorldInput = document.querySelector('#tileOptionsWorld' + nav.world);
	setLocaleTile = tileOptionsWorldInput.value.toLowerCase();
	setLandType();
  if (randomNamesCheckbox.checked) {
    switch (setLocaleTile) {
      case 'grassplains':
        setLocaleName = getRandomName(grasses);
        break;
      case 'water':
        setLocaleName = getRandomName(waters);
        break;
      case 'forest':
        setLocaleName = getRandomName(forests) + " Forest";
        break;
      case 'castle':
        setLocaleName = getRandomName(castles) + " Castle";
        break;
      case 'town':
        setLocaleName = getRandomName(towns) + " Town";
        break;
      case 'ruins':
        setLocaleName = getRandomName(ruins) + " Ruins";
        break;
      case 'tr_water':
        setLocaleName = getRandomName(tr_water) + " Waters";
        break;
      case 'tr_island':
        setLocaleName = getRandomName(tr_islands) + " Island";
        break;
			case 'tr_waterland':
				setLocaleName = getRandomName(tr_waterlands) + " Waterland";
				break;
      case 'tr_castle':
        setLocaleName = getRandomName(tr_castles) + " Longhouse";
        break;
      case 'ds_dirt':
        setLocaleName = getRandomName(ds_dirt);
        break;
      case 'ds_dunes':
        setLocaleName = getRandomName(ds_dunes) + " Dunes";
        break;
      case 'ds_ruins':
        setLocaleName = getRandomName(ds_ruins) + " Ruins";
        break;
      case 'ds_castle':
        setLocaleName = getRandomName(ds_castles) + " Fortress";
        break;
      case 'ds_town':
        setLocaleName = getRandomName(ds_towns) + " Town";
        break;
      case 'sp_normal':
        setLocaleName = getRandomName(sp_space) + " Space";
        break;
      case 'sp_debris':
        setLocaleName = getRandomName(sp_debris);
        break;
      case 'sp_gas1':
        setLocaleName = getRandomName(sp_gasfields) + " Field";
        break;
      case 'sp_station1':
        setLocaleName = getRandomName(sp_stations) + " Station";
        break;
      case 'sp_gplanet1':
      case 'sp_dplanet1':
      case 'sp_rplanet1':
      case 'sp_iplanet1':
        setLocaleName = getRandomName(sp_planets) + " Planet";
        break;
    }
  }
}

function insertLocaleChangesIntoQueue() {
	updateMapEditorSettings();
	if (setLocaleName == "undefined" || setLocaleTile == "undefined" || setLocaleLandType == "undefined") {
	 alert('Something is still undefined, not pushing into mapEditorQueue');
	} else {
		mapEditorQueue.push({
			"Tile": setLocaleTile,
			"Locale": Number(nav.locale),
			"Terrain": setLocaleLandType,
			"Locale_Name": setLocaleName
		});
		var queueText = '';
			$('#mapEditorDisplayText').html('');
		Object.keys(mapEditorQueue).forEach(key => {
			queueText += '<li>' + mapEditorQueue[key].Locale + ' - Name: ' + mapEditorQueue[key].Locale_Name + ' Terrain: ' + mapEditorQueue[key].Terrain + ' Tile: ' + mapEditorQueue[key].Tile + '</li>';
		});
		$('#mapEditorDisplayText').html('<strong>Proposed Tile changes: </strong><ul class="mapChangesList">' + queueText + '</ul>')
		console.log('added to update queue: ' + mapEditorQueue)
	}
}

async function appendEditsToZone() {
	var newEdits = mapEditorQueue;
	var currentMap = getLocaleData(nav.world, nav.zone);
	console.log("current map contains: ")
	console.log(currentMap)
	for (a in newEdits) {
		currentMap.forEach((element, index) => {
			if (element.Locale === newEdits[a].Locale) {
				currentMap[index] = newEdits[a];
				console.log('replacing ' + currentMap[index] + ' with ' + newEdits[a])
			}
		});
	}
	var updatedMap = {
		"locales": currentMap
	};

	console.log("updated map contains:");
	for (let obj of Object.values(updatedMap)) {
	  console.log(obj);
	}

 updateMapZoneData(nav.world, nav.zone, updatedMap);
  mapEditorQueue = [];
	$('#mapEditorDisplayText').html('<strong>Display Text: </strong>Updating the zone with changes.');
	setTimeout(function() {
		displayZones(nav.zone)
	}, 5000);
}

async function updateMapZoneData(world, zone, jdata) {
  var url = domain_url + '/players/zones/updatedata/' + world + '/' + zone;
  let change = {
    "mapgrid_4": world,
    "mapgrid_16": zone,
    "data": jdata
  };
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await axios.put(url, change, config);
    console.log('success');
  } catch (error) {
    console.error(error);
  }
}

function clearMapEditorQueue() {
	// clear the queue for map editor db call
	mapEditorQueue = [];
	$('#mapEditorDisplayText').html('Cleared Edit Queue!');
		displayZones(nav.zone)
}

async function reloadEditorMap(){
	const abc = await getMapData();
	const def = await displayZones(nav.zone);
}


//////// MAP GENERATOR //////////
////////////////////////////////
var forestWorld = [
	[0, 0, 'Forest Zone 0', 'Forest', 0, 100000, 'locked'],
	[0, 1, 'Forest Zone 1', 'Forest', 0, 100000, 'locked'],
	[0, 2, 'Forest Zone 2', 'Forest', 0, 100000, 'locked'],
	[0, 3, 'Forest Zone 3', 'Forest', 0, 100000, 'locked'],
	[0, 4, 'Forest Zone 4', 'Forest', 0, 100000, 'locked'],
	[0, 5, 'Forest Zone 5', 'Forest', 0, 100000, 'locked'],
	[0, 6, 'Forest Zone 6', 'Forest', 0, 100000, 'locked'],
	[0, 7, 'Forest Zone 7', 'Forest', 0, 100000, 'locked'],
	[0, 8, 'Forest Zone 8', 'Forest', 0, 100000, 'locked'],
	[0, 9, 'Forest Zone 9', 'Forest', 0, 100000, 'locked'],
	[0, 10, 'Forest Zone 10', 'Forest', 0, 100000, 'locked'],
	[0, 11, 'Forest Zone 11', 'Forest', 0, 100000, 'locked'],
	[0, 12, 'Forest Zone 12', 'Forest', 0, 100000, 'locked'],
	[0, 13, 'Forest Zone 13', 'Forest', 0, 100000, 'locked'],
	[0, 14, 'Forest Zone 14', 'Forest', 0, 100000, 'locked'],
	[0, 15, 'Forest Zone 15', 'Forest', 0, 100000, 'locked']
];
var tropicWorld = [
	[1, 0, 'Tropic Zone 0', 'Tropic', 0, 400000, 'locked'],
	[1, 1, 'Tropic Zone 1', 'Tropic', 0, 400000, 'locked'],
	[1, 2, 'Tropic Zone 2', 'Tropic', 0, 400000, 'locked'],
	[1, 3, 'Tropic Zone 3', 'Tropic', 0, 400000, 'locked'],
	[1, 4, 'Tropic Zone 4', 'Tropic', 0, 400000, 'locked'],
	[1, 5, 'Tropic Zone 5', 'Tropic', 0, 400000, 'locked'],
	[1, 6, 'Tropic Zone 6', 'Tropic', 0, 400000, 'locked'],
	[1, 7, 'Tropic Zone 7', 'Tropic', 0, 400000, 'locked'],
	[1, 8, 'Tropic Zone 8', 'Tropic', 0, 400000, 'locked'],
	[1, 9, 'Tropic Zone 9', 'Tropic', 0, 400000, 'locked'],
	[1, 10, 'Tropic Zone 10', 'Tropic', 0, 400000, 'locked'],
	[1, 11, 'Tropic Zone 11', 'Tropic', 0, 400000, 'locked'],
	[1, 12, 'Tropic Zone 12', 'Tropic', 0, 400000, 'locked'],
	[1, 13, 'Tropic Zone 13', 'Tropic', 0, 400000, 'locked'],
	[1, 14, 'Tropic Zone 14', 'Tropic', 0, 400000, 'locked'],
	[1, 15, 'Tropic Zone 15', 'Tropic', 0, 400000, 'locked']
];
var desertWorld = [
	[2, 0, 'Desert Zone 0', 'Desert', 0, 1250000, 'locked'],
	[2, 1, 'Desert Zone 1', 'Desert', 0, 1250000, 'locked'],
	[2, 2, 'Desert Zone 2', 'Desert', 0, 1250000, 'locked'],
	[2, 3, 'Desert Zone 3', 'Desert', 0, 1250000, 'locked'],
	[2, 4, 'Desert Zone 4', 'Desert', 0, 1250000, 'locked'],
	[2, 5, 'Desert Zone 5', 'Desert', 0, 1250000, 'locked'],
	[2, 6, 'Desert Zone 6', 'Desert', 0, 1250000, 'locked'],
	[2, 7, 'Desert Zone 7', 'Desert', 0, 1250000, 'locked'],
	[2, 8, 'Desert Zone 8', 'Desert', 0, 1250000, 'locked'],
	[2, 9, 'Desert Zone 9', 'Desert', 0, 1250000, 'locked'],
	[2, 10, 'Desert Zone 10', 'Desert', 0, 1250000, 'locked'],
	[2, 11, 'Desert Zone 11', 'Desert', 0, 1250000, 'locked'],
	[2, 12, 'Desert Zone 12', 'Desert', 0, 1250000, 'locked'],
	[2, 13, 'Desert Zone 13', 'Desert', 0, 1250000, 'locked'],
	[2, 14, 'Desert Zone 14', 'Desert', 0, 1250000, 'locked'],
	[2, 15, 'Desert Zone 15', 'Desert', 0, 1250000, 'locked']
];
var spaceWorld = [
	[3, 0, 'Space Zone 0', 'Space', 0, 7200000, 'locked'],
	[3, 1, 'Space Zone 1', 'Space', 0, 7200000, 'locked'],
	[3, 2, 'Space Zone 2', 'Space', 0, 7200000, 'locked'],
	[3, 3, 'Space Zone 3', 'Space', 0, 7200000, 'locked'],
	[3, 4, 'Space Zone 4', 'Space', 0, 7200000, 'locked'],
	[3, 5, 'Space Zone 5', 'Space', 0, 7200000, 'locked'],
	[3, 6, 'Space Zone 6', 'Space', 0, 7200000, 'locked'],
	[3, 7, 'Space Zone 7', 'Space', 0, 7200000, 'locked'],
	[3, 8, 'Space Zone 8', 'Space', 0, 7200000, 'locked'],
	[3, 9, 'Space Zone 9', 'Space', 0, 7200000, 'locked'],
	[3, 10, 'Space Zone 10', 'Space', 0, 7200000, 'locked'],
	[3, 11, 'Space Zone 11', 'Space', 0, 7200000, 'locked'],
	[3, 12, 'Space Zone 12', 'Space', 0, 7200000, 'locked'],
	[3, 13, 'Space Zone 13', 'Space', 0, 7200000, 'locked'],
	[3, 14, 'Space Zone 14', 'Space', 0, 7200000, 'locked'],
	[3, 15, 'Space Zone 15', 'Space', 0, 7200000, 'locked']
];
var terrainTypes = ['land', 'water', 'space']; // vehicle travel permissible
// boss tile, easy, medium, hard, neutral, craft
var naturalTiles = ['grassplains', 'forest', 'water', 'ruins', 'town', 'castle'];
var tropicTiles = ['tr_water', 'tr_water', 'tr_water', 'tr_island', 'tr_waterland', 'tr_castle']; //'sunk ship', 'floating town', 'water fortress'
var desertTiles = ['ds_dirt', 'ds_dirt', 'ds_dunes', 'ds_ruins', 'ds_town', 'ds_castle'];
var spaceTiles = ['sp_normal', 'sp_normal', 'sp_normal', 'sp_gas1', 'sp_debris', 'sp_station1'];
var forests = ["Spooky", "Whispers", "Mushbrooms", "Creaky", "Dewdrop", "Spiderweb", "Old Branch", "Shadowy", "Scratchingpost", "Monkeydream", "Birdbirch", "Perching Pine", "Howling Oaks", "Caterpillar", "Barking Birch", "Fairy Elm", "Creaking Elm", "Creaking Timber", "Mister E.", "Mumbling Mosquito", "Mossy", "Berrytree", "Sneakytree", "Run-n-Hide", "Tangleknot", "Wovensilk", "Spiderking", "Green Wizard's", "Screeching Timber"];
var waters = ["Calm Waters", "Gentlebubbles Pond", "Mooshy Marshes", "Pleasant Pond", "Easy Sailing Lake", "Beachball Beach", "Soggy Britches Lake", "Mildew Marsh", "Cat Tails Marsh", "Cat Tails Cove", "Sunbeam Shore"];
var lands = ["Grassy Hills", "Purring Plains", "Butterfly Fields", "Happy Plains", "Picnic Valley", "Summerwind Valley", "Bird Song Hills", "Morningcheer Hills"];
var castles = ["Shakyknees", "Tremblewhisker", "Saberfang", "Fleefoot", "Moonhowl", "Stayaway", "Dangerzone", "Afraidmore", "Oh-no", "Hiccup"];
var ruins = ["Ancient"];
var towns = ["Relaxing"];
function createZones(array) {
	for (m in array) {
		addZone(array[m][0], array[m][1], array[m][2], array[m][3], array[m][4], array[m][5], array[m][6], array[m][7]);
	}
}


function generateLocale(zone) {
  let tileType;
	let world = nav.world;
  if (world === 0) {
    tileType = naturalTiles;
  } else if (world === 1) {
    tileType = tropicTiles;
  } else if (world === 2) {
    tileType = desertTiles;
  } else if (world === 3) {
    tileType = spaceTiles;
  }
  createLocale(world, zone, tileType);
}


async function addZone(grid4, grid16, name, type, paid, required, status, data) {
try {
const newZone = {
"mapgrid_4": grid4,
"mapgrid_16": grid16,
"zone_name": name,
"zone_type": type,
"gxp_paid": paid,
"gxp_required": required,
"status": status,
"data": data
};
const options = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newZone)
};
const response = await axios.post(domain_url + '/players/zones/', options);
console.log('success');
} catch (error) {
console.error(error);
}
}



function createNewZoneModal() {
  const confirmationDialog = $('<div>', { id: 'confirmation-dialog', class: 'd-none' });
  const message = $('<p>').text('Are you sure you wish to create a new zone? (Warning: all locales will be deleted and replaced!)');
  const confirmBtn = $('<button>', { id: 'confirm-btn', class: 'btn btn-primary' }).text('Confirm');
  const cancelBtn = $('<button>', { id: 'cancel-btn', class: 'btn btn-secondary' }).text('Cancel');
  confirmationDialog.append(message, confirmBtn, cancelBtn);
  $('body').append(confirmationDialog);
  confirmationDialog.removeClass('d-none');
  confirmBtn.on('click', handleConfirm);
  cancelBtn.on('click', handleCancel);
}

 function handleConfirm() {
	 createNewZone();
	 hideConfirmationDialog();
 }

 function handleCancel() {
	 console.log('Rejected.');
	 hideConfirmationDialog();
 }

 function hideConfirmationDialog() {
	 const confirmationDialog = document.getElementById('confirmation-dialog');
	 confirmationDialog.classList.add('d-none');
 }

function createNewZone() {
	//{"locales":[{"Tile":"sp_normal","Locale":0,"Terrain":"space","Locale_Name":"sp_normal tile"},
	var newJSONB = [];
	var terrainType;
	var tileType;
	var localeName;
	if (nav.world == 3) {
		terrainType = "space";
		tileType = "sp_normal";
		localeName = "Space";
	}
	if (nav.world == 2) {
		terrainType = "land";
		tileType = "ds_dirt";
		localeName = "Desert";
	}
	if (nav.world == 1) {
		terrainType = "water";
		tileType = "tr_water";
		localeName = "Water";
	}
	if (nav.world == 0) {
		terrainType = "land";
		tileType = "grassplains";
		localeName = "Grass Plains";
	}
	for (i = 0; i < 256; i++) {
		newJSONB.push({
			"Tile": tileType,
			"Locale": i,
			"Terrain": terrainType,
			"Locale_Name": localeName
		})
	}
	var jsonObject = {
		"locales": newJSONB
	};
	updateMapZoneData(nav.world, nav.zone, jsonObject);
	setTimeout(function() {
		displayZones(nav.zone)
	}, 10000);
}

function createZone(mapgrid_4, tiles) {
	for (m = 0; m < 16; m++) { // runs this loop 16 times for 16 zones
		createLocale(mapgrid_4, m, tiles); // creates 256 items and stores to database
	}
}



function randomIntFloor(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function createLocale(mapgrid_4, mapgrid_16, tileType) {
  var newJSONB = [];
  var tile;
  for (let i = 0; i < 256; i++) {
    var mapgrid_256 = i;
    var c = randomIntFloor(0, 100);
    // if (c > 10 && c < 66) {
		// 		//grassplains, tr_water, desert plains, sp_normal
    //   tile = tileType[0];
    // } else if (c > 65 && c < 90) {
		// 	// forest, tr_water, mountain, sp_normal
    //   tile = tileType[1];
    // } else if (c > 89 && c < 92) {
		// 	// 4 required of these and no less
		// 	// ruins, tr_island, desert hills, sp_normal
    //   tile = tileType[2];
    // } else if (c > 91 && c < 94) {
		// 	// only 3 of these maximum and no less than 1
		// 	//town, tr_waterland, ghost town, sp_debris
    //   tile = tileType[3];
    // } else if (c > 93 && c < 97) {
		// 				// only 2 of these minimum
		// 	// castle, tr_castle, desert castle, sp_station1
    //   tile = tileType[4];
    // } else {
    //   tile = tileType[5];
    // }
if (c >= 0 && c < 66) {
  // grassplains, tr_water, desert plains, sp_normal
  tile = tileType[0];
} else if (c >= 66 && c < 90) {
  // forest, tr_water, mountain, sp_normal
  tile = tileType[1];
} else if (c >= 90 && c < 94) {
  // 4 required of these and no less
  tile = tileType[2]; // ruins
} else if (c >= 94 && c < 97) {
  // only 3 of these maximum and no less than 1
  tile = tileType[3]; // town
} else if (c >= 97 && c < 100) {
  // only 2 of these minimum
  tile = tileType[4]; // castle
} else {
  tile = tileType[5];
}

    var locale_name = tile + " tile";
    var special = 0;
    var terrain = 'land';
    if (tile === 'water') {
      terrain = 'water';
    }
		if (tile === 'tr_water') {
			terrain = 'tr_water';
		}
    if (tile === 'sp_normal') {
      terrain = 'space';
    }
		locale_name = createNewLocaleName(tile);
    newJSONB.push({
      "Tile": tile,
      "Locale": i,
      "Terrain": terrain,
      "Locale_Name": locale_name
    });
  }
  var jsonObject = {
    "locales": newJSONB
  };
	 alert('UPDATED ZONE: ' + nav.zone + ' UPDATED: ' + jsonObject.locales.length + ' tiles');
	 await updateMapZoneData(nav.world, nav.zone, jsonObject);
  console.log(jsonObject);
}

// setTimeout(function() {
//   displayZones(nav.world);
// }, 10000);

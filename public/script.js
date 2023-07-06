const domain_url = "https://express-crushie.herokuapp.com";
const url_ipfs = "https://ipfs.io/ipfs/";
const wax_endpoint = 'https://wax.api.atomicassets.io';
const wax_api = wax_endpoint + '/atomicassets/v1/assets?collection_name=cutecrushies&schema_name=';
const wax_api2 = '&page=1&limit=100&order=desc&sort=asset_id';
const url_get_asset = wax_endpoint + '/atomicassets/v1/assets/';
var url_vehicles, url_houses, url_creatures, url_items, url_food, url_coins, url_dust, url_player;
var selectedSchema;

async function createUrls(wallet) {
  url_vehicles = wax_api + 'vehicles&owner=' + wallet + wax_api2;
  url_houses = wax_api + 'houses&owner=' + wallet + wax_api2;
  url_creatures = wax_api + 'creature&owner=' + wallet + wax_api2;
  url_items = wax_api + 'items&owner=' + wallet + wax_api2;
  url_food = wax_api + 'foods&owner=' + wallet + wax_api2;
  url_coins = wax_api + 'coins&owner=' + wallet + wax_api2;
  url_dust = 'https://api.wax.alohaeos.com/v2/state/get_tokens?limit=250&account=' + wallet;
  url_player = domain_url + '/players/' + wallet;
}

var schemas = ['creature', 'food', 'items', 'vehicles', 'houses', 'coins'];

var playerData = {
  wallet: "",
  joinDate: "",
  lastOnline: new Date(),
  gxp: 0,
  nectar: 0,
  credits: 0,
  gameStats: {},
  dust: 0,
  wax: 0
};

var nav = {
  world: 0,
  zone: 0,
  locale: 0
}

var allZones = [];

let allTeams = [];
let myTeams = [];
let activeAdventures = [];
let playerAdventures = [];
let allTeamsCreatures = [];
let allTeamsVehicles = [];
let vehiclesData = {};
let creaturesData = {};
let housesData = {};

var newTeamObject = {
  vehicles: [],
  creatures: [],
  capacity: 0,
  house: 'None'
}
var newDestination = {
  world: 0,
  zone: 0,
  locale: 0
};

var enableSetAdventure=false;
var teamSelectedForAdventure='None';

//create modals used in Cute Crushies Blockchain Game
createTeamConfirmModal();
createPayZoneModal();
createTeamViewModal();
createSetLocationModal();
createHouseAssignModal();
createHowToPlayModal();

getMapData();
displayWorlds();
//
// async function login() {
//   const userAccount = await wax.login();
//   playerData.wallet = wax.userAccount;
//   const urls = await createUrls(playerData.wallet);
//   document.getElementById('loginButton').innerHTML = wax.userAccount;
// 	$('#loginButton').css('font-weight', 'bold');
//   const show = await displayBalances(url_player, url_dust);
//   myTeams = await getPlayerTeams();
//   activeAdventures = await getAdventuresByPlayer();
//   const assets = await displayInventory('creature');
//   const globalgxp = await displayGlobalGXPBalance();
//
//   const loadHouses = await reloadPlayerHouseData();
//   const loadVehicles = await reloadPlayerVehiclesData();
//
//   getGameLogs().then(() => displayGameLogs('wax_id')).catch(error => console.error(error));
//
//
// }

async function login() {
  const userAccount = await wax.login();
  playerData.wallet = wax.userAccount;
  const urls = await createUrls(playerData.wallet);
  document.getElementById('loginButton').innerHTML = wax.userAccount;
  $('#loginButton').css('font-weight', 'bold');
  const [
    balances,
    teams,
    adventures,
    assets,
    globalgxp,
    houses,
    vehicles
  ] = await Promise.all([
    displayBalances(url_player, url_dust),
    getPlayerTeams(),
    getAdventuresByPlayer(),
    displayInventory('creature'),
    displayGlobalGXPBalance(),
    reloadPlayerHouseData(),
    reloadPlayerVehiclesData()

  ]);

  await displayGameLogs(playerData.wallet);
  setInterval(() => {
  displayGameLogs(playerData.wallet);
}, 15 * 60 * 1000);
}



async function reloadPlayerTeamData(){
  myTeams = await getPlayerTeams();
  housesData = await fetchTable(playerData.wallet, 'cutecrushies', 'houses');
  const assets = await reloadPlayerActiveTeams('Ready');
}
async function reloadPlayerData(){
  vehiclesData = await fetchTable(playerData.wallet, 'cutecrushies', 'vehicles');
  creaturesData = await fetchTable(playerData.wallet, 'cutecrushies', 'creature');
}
async function reloadPlayerHouseData(){
    housesData = await fetchTable(playerData.wallet, 'cutecrushies', 'houses');
}
async function reloadPlayerVehiclesData(){
    vehiclesData = await fetchTable(playerData.wallet, 'cutecrushies', 'vehicles');
}


function convertDateSimple(isoDateStr){
	const dateObj = new Date(isoDateStr);
	const month = dateObj.toLocaleString('en-US', { month: '2-digit' });
	const day = dateObj.toLocaleString('en-US', { day: '2-digit' });
	const year = dateObj.toLocaleString('en-US', { year: 'numeric' });
	const hour = dateObj.toLocaleString('en-US', { hour: 'numeric', hour12: true });
	// const formattedDateStr = `${month}-${day}-${year} at ${hour}`;
  const formattedDateStr = `${month}-${day}-${year}`;
	return formattedDateStr;
}

function displayBalanceIcons(type, value, imagePath) {
  if (value === 0) {
    return value.toString();
  } else {
    let imageTags = '';
    for (let i = 0; i < value; i++) {
      imageTags += `<img src="${imagePath}" width="12px" alt="${type}">`;
    }
    return imageTags;
  }
}

async function displayBalances(db_url, wax_url) {
  const db = await getPlayer(db_url);
  const wax = await getWaxBalances(wax_url);
  document.getElementById('dustBalance').innerText = abbreviateNumber(playerData.dust);
  document.getElementById('waxBalance').innerText = abbreviateNumber(playerData.wax);
  document.getElementById('gxpBalance').innerText = abbreviateNumber(playerData.gxp);
  document.getElementById('nectarBalance').innerHTML = displayBalanceIcons("Nectar", playerData.nectar, "../images/nav/Nectar.png");
  document.getElementById('creditsBalance').innerHTML = displayBalanceIcons("Credits", playerData.credits, "../images/nav/Credits.png");

  var dateFixed=convertDateSimple(playerData.lastOnline);
  var dateFixed2=convertDateSimple(playerData.joinDate);
  // document.getElementById('lastOnline').innerText = `${dateFixed}`;
  // document.getElementById('joinDate').innerText = `${dateFixed2}`;
  $('#loginButton').attr('title', `Join date: ${dateFixed2} - Last online: ${dateFixed}`);

}

async function getPlayer(url) {
  axios.get(url_player, {
    wax_id: playerData.wallet
  }).then((response) => {
    console.log(response.data[0])
    console.log(response.data)
    if (response.data && response.data[0]) {
      var r = response.data[0].gxp;
      playerData.gxp = Number(response.data[0].gxp);
      playerData.nectar = response.data[0].nectar ? Number(response.data[0].nectar) : 0;
      playerData.credits = response.data[0].credits;
      playerData.joinDate = response.data[0].date_joined;
      playerData.lastOnline = response.data[0].last_online;
    } else {
      console.log("No player data found for this wallet", playerData.wallet);
    }
  }, (error) => {
    console.log(error);
  })
}

var allBalances = {};
async function getPlayerBalances() {
  var url = 'https://express-crushie.herokuapp.com/players/';
  try {
    const response = await axios.get(url);
    if (response.data) {
      var balancesData = response.data;
      var playerBalances = {}; // Initialize the playerBalances object
      for (var i = 0; i < balancesData.length; i++) {
        var playerData = {};
        var wax_id = balancesData[i].wax_id;
        playerData.gxp = Number(balancesData[i].gxp);
        playerData.nectar = balancesData[i].nectar;
        playerData.credits = balancesData[i].credits;
        playerData.joinDate = balancesData[i].date_joined;
        playerData.lastOnline = balancesData[i].last_online;
        playerBalances[wax_id] = playerData;
      }
      return playerBalances;
    } else {
      console.log("No player data found");
      return null;
    }
  } catch (error) {
    console.log("Error occurred while fetching player data:", error);
    return null;
  }
}

(async function () {
  allBalances = await getPlayerBalances();
})();


async function getWaxBalances(url) {
  try {
    const response = await axios.get(url);
    const tokens = response.data.tokens;
    tokens.forEach(token => {
      if (token.symbol === 'WAX') {
        playerData.wax = (Math.round(token.amount * 100) / 100).toFixed(2);
      }
      if (token.contract == 'niftywizards' && token.symbol === 'DUST' || token.contract === 'niftywizards') {
        playerData.dust = (Math.round(token.amount * 100) / 100).toFixed(2);
      }
    });
    return {
      dust: playerData.dust,
      wax: playerData.wax
    }
  } catch (error) {
    console.log(error);
  }
}

async function storeData(schema, data) {
  if (schema === 'creature') {
    creaturesData = data;
  }
  if (schema === 'vehicles') {
    vehiclesData = data;
  }
}

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
  storeData(schema, finalResult); // store the data for vehicles and creatures for img calls
  return finalResult;
}

schemaSelect.addEventListener('change', function() {
	const selectedSchema = this.value;
	displayInventory(selectedSchema);
});

async function displayInventory(selectedSchema) {
  const inventory = $("#general-inventory");
  inventory.empty();
  inventory.append('<br><br><div class="spinner-border text-primary" role="status"><span class="sr-only"></span></div>');
  const items = await fetchTable(playerData.wallet, 'cutecrushies', selectedSchema);
  inventory.empty();
  items.forEach(item => {
    const div = $("<div>", { id: item.asset_id, class: "inventory-item" });
    const img = $("<img>", { src: `https://ipfs.io/ipfs/${item.data.img}` });
    div.append(img);
    const details = $("<div>", { class: "item-details" });
    const name = $("<span>", { class: "asset-name" }).html(item.name + ' #' + item.template_mint);
    details.append(name);
    const assetId = $("<span>", { class: "asset-id" }).html('ID#' + item.asset_id);
    details.append(assetId);
    const buttons = $("<div>", { class: "buttons" });
    var schema = item.schema.schema_name;
    if (schema === 'vehicles' || schema === 'creature') {
      var inTeam = isInTeam(schema, item);
      try {
        if (inTeam.inTeam == true) {
          div.addClass("in-team");
          const teamDisp = $("<span style='background: #e7ddff; border-radius:4px; padding:4px;'>").html(`Team #${inTeam.teamId}`);
          details.append(teamDisp);
        } else {
              if (schema === 'vehicles'){
                const ccbtn = createTeamButton(item, div, addToTeam);
                details.append(ccbtn);
              } else {
                    div.on("click", () => {
                    const id = div.attr("id");
                    addToTeam(item.schema.schema_name, item, id);
                    });
              }
        }
      } catch (error) {
        console.error(error);
      }
    }
    div.append(details);
    div.append(buttons);
    inventory.append(div);
  });
}

$("#adventureSelect").on("change", function() {
  const selectedStatus = $(this).val();
  const inventory = $("#general-inventory");
  inventory.empty();
  getAdventuresByPlayer().then(adventures => {
    adventures.filter(adventure => adventure.status === selectedStatus)
              .forEach(adventure => {
                const adventureItem = createAdventureItem(adventure);
                inventory.append(adventureItem);
              });
  });
});
function getTimeLeft(current, init) {
  const secondsLeft = (init - current) / 10 * 60 * 2;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = Math.floor(secondsLeft % 60);
  const timeString = `${minutes}m ${seconds}s left`;
  return timeString;
}


function createAdventureItem(adventure) {

  const locationName = getLocationName(allZones, adventure.mapgrid_4, adventure.mapgrid_16, adventure.mapgrid_256)

  const div = $("<div>", { id: adventure.adventure_id, class: "inventory-item" });
  const img = $("<img>", { src: 'Adventure.png' });
  const buttons = $("<div>", { class: "buttons" });
  div.append(img);
  const details = $("<div>", { class: "item-details" });
  div.append(details);
  const name = $("<span class='adventure-id'>").html('Adventure ID# ' + adventure.adventure_id);
  details.append(name);

  // const status = $("<span class='adventure-status'>").html(adventure.status);
  // details.append(status);

  if (adventure.status === "In Progress") {
    const team = $("<span class='team-id'>").html('Team #' + adventure.team_id + ' is travelling to ' + locationName);
    details.append(team);
    const timeLeft = getTimeLeft(adventure.current_steps, adventure.init_steps);
    const timer = $("<span class='team-id'>").html(timeLeft);
    details.append(timer);
    const location = $("<span class='team-destination'>").html("World " + (adventure.mapgrid_4 + 1) + ", Zone " + (adventure.mapgrid_16 + 1) + ", Sq # " + (adventure.mapgrid_256 + 1));
    details.append(location);

    const bar = createProgressBar(adventure.status, Number(adventure.current_steps), Number(adventure.init_steps));
    div.append(bar);
    const playButton = createPlayButton();
    buttons.append(playButton);
    const cancelButton = createAdventureCancelButton(adventure.adventure_id);
    buttons.append(cancelButton);
  } else if (adventure.status === "Complete") {
    const team = $("<span class='team-id'>").html('Team #' + adventure.team_id + ' has arrived at ' + locationName);
    details.append(team);
    const location = $("<span class='team-destination'>").html("World " + (adventure.mapgrid_4 + 1) + ", Zone " + (adventure.mapgrid_16 + 1) + ", Sq# " + (adventure.mapgrid_256 + 1));
    details.append(location);
    const claimButton = createClaimButton(adventure.adventure_id);
    buttons.append(claimButton);
  }
  div.append(buttons);
  return div;
}


$('#teamsTypeSelect').on('change', function() {
  const selectedStatus = $(this).val();
  const teamsDiv = $('#general-inventory');
  teamsDiv.empty();
  getPlayerTeams().then(teams => {
    teams.filter(team => team.status === selectedStatus)
         .forEach(team => {
           const teamItem = createTeamItem(team);
           teamsDiv.append(teamItem);
         });
  });
});

async function reloadPlayerActiveTeams(status){
  const teamsDiv = $('#general-inventory');
  teamsDiv.empty();
  getPlayerTeams().then(teams => {
    teams.filter(team => team.status === status)
         .forEach(team => {
           const teamItem = createTeamItem(team);
           teamsDiv.append(teamItem);
         });
  });
}

function createTeamItem(team) {
  const teamItem = $('<div>').addClass('inventory-item')
    .attr('data-team-id', team.team_id)
    .attr('data-creatures-assigned', team.data?.creatures)
    .attr('data-vehicles-assigned', team.data?.vehicles)
    .attr('data-house-assigned', team.data?.house)
    .attr('data-team-status', team.status);
    // we should use a class here instead that is uniform for all teams, adventures etc


    var img = $('<img>');
    var imageUrl = getAssetImage(team.data.vehicles[0], vehiclesData);
    if (imageUrl !== '') {
      img.attr('src', imageUrl).css('width', '50px');
    } else {
      img.attr('src', 'Team.png');
    }


  const details = $("<div>", { class: "item-details" });
  const buttons = $("<div>", { class: "buttons" });
  teamItem.append(img);
  // const teamNameSpan = $('<span>').text(team['team_name']).addClass('team-name');
  // details.append(teamNameSpan);
  const teamIdSpan = $('<span>').text('Team ID# ' + team['team_id']).addClass('team-name');
  details.append(teamIdSpan);

    // var teamHouse = $('<span>').text('House Assigned: ' + team.data.house);

    if (team.data.house) {
      var houseName = getAssetInfo(team.data.house, 'name', housesData);
      teamHouse = $('<span>').text('House Assigned: ' + houseName);
      if(houseName==null){
          teamHouse = $('<span>').text('House Assigned: None');
      }
    }

  var team_vehicle = findTeamVehicle(team.team_id);
  var vt = getImmutableData(team_vehicle, 'terrain', vehiclesData);
  terrain_type = $('<span>').text('Vehicle Type: ' + vt);

  details.append(teamHouse);
  details.append(terrain_type);

  if(team.status === 'Napping'){
    const timeLeft = getTimeLeft(team['nap_current'], team['nap_total']);
    const timer = $("<span>").text(timeLeft);
    details.append(timer);
  }

  teamItem.append(details);
  const bar = createProgressBar(team.status, team.nap_current, team.nap_total);
  teamItem.append(bar);
  const viewButton = createViewButton(team);

  if (team.status === 'Ready') {
    const adventureButton = createAdventureButton(team);
    const disbandButton = createDisbandButton(team);
    buttons.append(adventureButton);
    if (team.data.house === 'None') {
      const selectHouseButton = createSelectHouseButton(team);
      buttons.append(selectHouseButton);
    } else {
      const moveHouseButton = createMoveHouseButton(team);
      buttons.append(moveHouseButton);
    }
    buttons.append(disbandButton);
  }
  teamItem.append(buttons);
  buttons.append(viewButton);
  return teamItem;
}

function createViewButton(team) {
  return $('<button class="btn btn-secondary btn-sm">').text('View Team')
          .attr('data-team-id', team.team_id) // Set data-team-id attribute
          .on('click', function() {
            const team_id = $(this).attr('data-team-id');
            displayTeamViewModal(team_id);
          });
}

function createDisbandButton(team) {
  return $('<button class="btn btn-secondary btn-sm">').text('Disband Team')
            .attr('data-team-id', team.team_id) // Set data-team-id attribute
            .on('click', function() {
              const team_id = $(this).attr('data-team-id');
              var x = $(this).attr('data-team-id');
              $(this).closest('.inventory-item').remove();
              deleteTeam(team_id);
              reloadPlayerTeamData();
            });
}

function createAdventureButton(team) {
  return $('<button class="btn btn-secondary btn-sm btn-success">').text('Start Adventure')
    .attr('data-team-id', team.team_id)
    .attr('data-start-btn', team.team_id)
    .on('click', function() {
      var team_id = $(this).attr('data-team-id');
      if(!enableSetAdventure){
        enableSetAdventure = true;
        teamSelectedForAdventure = team_id;
        $(this).text('Setting adventure location...').removeClass('btn-success').addClass('btn-danger');
        $('button[data-start-btn]').not(this).removeClass('btn-danger').addClass('btn-success');
      }
    });
}



function createSelectHouseButton(team) {
  return $('<button class="btn btn-secondary btn-sm">').text('Select House')
            .attr('data-team-id', team.team_id) // Set data-team-id attribute
            .on('click', function() {
              const team_id = $(this).attr('data-team-id');
              // alert(team_id)
              displayHouseAssignModal(team_id);
              $('#assign-house').css('display', 'none !important');
            });
}

function createMoveHouseButton(team) {
  const moveHouseButton = $('<button class="btn btn-secondary btn-sm">')
    .text('Move Out')
    .attr('data-team-id', team.team_id)
    .attr('data-house-assigned', team.data.house)
    .on('click', function() {
      const team_id = $(this).attr('data-team-id');
      const house_id = $(this).attr('data-house-assigned');
      alert(`Moved Out! Team #${team_id} has moved out of House ID#${house_id}`);
      updateTeamHouse(team_id, 'None');
      reloadPlayerTeamData();
      $('#assign-house').css('display', 'none !important');
    });
  return moveHouseButton;
}

async function displayModalInventory(teamId, modalType, selectedSchema) {
  const $inventory = $("#modal-inventory");
  $inventory.empty();
  $inventory.append('<br><br><div class="spinner-border text-primary" role="status"><span class="sr-only"></span></div>');
  const items = await fetchTable(playerData.wallet, 'cutecrushies', selectedSchema);
  $inventory.empty();
  items.forEach(item => {
    const $div = $("<div>", { class: "inventory-item" });
    const $img = $("<img>").attr("src", 'https://ipfs.io/ipfs/' + item.data.img);
    $div.append($img);

    const $details = $("<div>", { class: "item-details" });
    const $name = $("<span>", { class: "asset-name" }).html(item.name + ' #' + item.template_mint);
    const $assetId = $(" <span>", { class: "asset-id" }).html('ID#' + item.asset_id);
    $details.append($name);
     $details.append($name, $assetId);
    $div.append($details);

    if (modalType === 'selectHouse') {
      const $setHouseButton = $("<button>", { class: "btn btn-secondary btn-sm" })
        .html("Select House")
        .attr({ "id": item.asset_id, "data-teamid": teamId })
        .on("click", (event) => {
          const assetId = event.target.getAttribute("id");
          const team = event.target.getAttribute("data-teamid");
          updateTeamHouse(team, assetId);
          reloadPlayerActiveTeams('Ready');
        });
      $div.append($setHouseButton);
    }

    $inventory.append($div);
  });
}


async function getAdventuresByPlayer() {
  try {
    const {
      data
    } = await axios.get(`${domain_url}/adventures/owner/${playerData.wallet}`);
    playerAdventures = data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

function createProgressBar(event, current, total) {
  var text = '';
  if(event==='In Progress'){
    text = "Adventuring";
  }
  if(event==='Napping'){
    text = "Napping";
  }
  if(event==='Ready'){
    text = "Ready";
  }
  const progressBarContainer = document.createElement("div");
  progressBarContainer.classList.add("progress");
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  const progress = Math.round((current / total) * 100);
  progressBar.setAttribute('aria-valuenow', progress);
  progressBar.style.width = progress + '%';
  progressBar.innerHTML = progress + '% ' + text;
  progressBarContainer.appendChild(progressBar);
  return progressBarContainer;
}


function createAdventureCancelButton(adventure_id) {
  return $('<button class="btn btn-secondary btn-sm">').text('Cancel Adventure')
            .attr('data-adventure-id', adventure_id)
            .on('click', function() {
              alert($(this).attr('data-adventure-id'))
              var x = $(this).attr('data-adventure-id');
              $(this).closest('.inventory-item').remove();
              deleteAdventure($(this).attr('data-adventure-id'));
            });
}

function createPlayButton() {
  return $('<button class="btn btn-secondary btn-sm btn-success">').text('Play Mini Game');
}

function createClaimButton(adventure_id) {
 return $('<button class="btn btn-secondary btn-sm btn-success">')
   .text('Claim Reward')
   .attr('data-adventure-id', adventure_id)
   .on('click', function() {
     alert('Claiming reward for adventure: ' + adventure_id);
     var x = $(this).attr('data-adventure-id');
     $(this).closest('.inventory-item').remove();
     updateRewardStatus(x);
     deleteAdventure(x);
             // updateTeamLocation(id, 'Napping', 0, 0, 0, 0);
             // remove the reward using jquery
   });
}

async function updateRewardStatus(event_id) {
  const url = `${domain_url}/rewards/${event_id}`
  const change = {
    "event_id": event_id,
    "status": "Claimed"
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await axios.put(url, change, config)
    console.log("success")
  } catch (error) {
    console.error(error)
  }
}

async function updateTeamLocation(teamid, status, grid4, grid16, grid256, nap) {
  const url = `${domain_url}/teams/setlocation/${teamid}`
  const change = {
    "mapgrid_4": grid4,
    "mapgrid_16": grid16,
    "mapgrid_256": grid256,
    "nap_current": nap,
    "status": status
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await axios.put(url, change, config)
    console.log(`successfully updated team location (${teamid})`)
  } catch (error) {
    console.error(error)
  }
}


function createTeamButton(item, div, addToTeam) {
  const button = $('<button class="btn btn-secondary btn-sm">').text('Create Team');
  div.on("click", () => {
    const id = div.attr("id");
    addToTeam(item.schema.schema_name, item, id);
  });
  return button;
}


// addteam api call
async function addTeam(teamName, vehicles, creatures) {
  if(teamName==null){
    teamName="Unnamed Team";
  }
  console.log("we are passing :" + vehicles)
  console.log("we are passing :" + creatures + " into the jsonb")
  let newTeam = {
    "owner_id": playerData.wallet,
    "team_name": teamName,
    "mapgrid_4": 0,
    "mapgrid_16": 0,
    "mapgrid_256": 0,
    "nap_current": 0,
    "nap_total": 100,
    "status": "Napping",
    "data": {
      "vehicles": vehicles,
      "creatures": creatures,
      "house": "None"
    }
  };
  try {
    const response = await axios.post(domain_url + '/teams/', newTeam);
    if (response.status === 201) {
      console.log(response.status)
      newTeamObject = { vehicles: [], creatures: [], capacity: 0  }
      displayNewTeamContainer();
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateTeamHouse(team, asset_id) {
  const data = { "house": asset_id };
  //alert("Attempting to update team with house id: " + data.house)
  try {
    const response = await axios.put(domain_url + '/teams/sethouse/' + team, { data });
    if (response.status === 200) {
      console.log("Team house updated successfully.");
    } else {
      console.log("Error updating team house: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteTeam(teamid) {
  const url = `${domain_url}/teams/${teamid}`;
  try {
    await axios.delete(url);
    alert(`Successfully deleted team ID: ${teamid}`);
  } catch (error) {
    console.error(error);
  }
}

async function deleteAdventure(adventure_id) {
  const url = `${domain_url}/adventures/${adventure_id}`;
  try {
    await axios.delete(url);
    alert(`Successfully deleted adventure ID: ${adventure_id} - Your team will now nap.`);
  } catch (error) {
    console.error(error);
  }
}

function addToTeam(schema, item, id) {
  alert('You clicked: ' + schema + ', asset ID# ' + item.asset_id);

  var inTeam = isInTeam(schema, item);
  if (inTeam.inTeam) {
    alert(`item with asset ID#${item.asset_id} is already in team ${inTeam.teamId}`);
    return;
  }

  if (schema === "vehicles") {
    if (newTeamObject.vehicles.length > 0) {
      // Remove green color from previously selected vehicle
      $('#' + newTeamObject.vehicles[0]).css('background', '');
      newTeamObject.vehicles = [];
    }
    $('#' + id).css('background', '#3f0');
    var inNewTeam = newTeamObject.vehicles.includes(item.asset_id);
    if (inNewTeam) {
      alert('item is already in a team!')
      return;
    }
    newTeamObject.vehicles.push(item.asset_id);
    newTeamObject.capacity = getMaxCapacity(item.asset_id, vehiclesData)
    alert('vehicle successfully added to team!')
    $('#new-team-list').show();
  } else if (schema === "creature") {
    var inNewTeam = newTeamObject.creatures.includes(item.asset_id);
    if (inNewTeam) {
      alert('item is already in a team!')
      return;
    }
    if (isTeamFull()) {
      alert('There is no room or no team vehicle selected.')
      return;
    }
    newTeamObject.creatures.push(item.asset_id);
    alert('creature successfully added to team!')
    // use the id passed in here to change the color of the div
    $('#'+id).css("background","#3f0")
  }

  displayNewTeamContainer();
}

function displayNewTeamContainer() {
  $('#display_area').empty();
  $('#display_area').append('New Team Capacity: ' + newTeamObject.creatures.length + ' / ' + newTeamObject.capacity);
  for (var j = 0; j < newTeamObject.vehicles.length; j++) {
    var vehicleId = newTeamObject.vehicles[j];
    var img = getAssetImage(vehicleId, vehiclesData);
    var name =  getAssetInfo(vehicleId, 'name', vehiclesData);
    if (img) {
      appendAssetImageAndId('#display_area', 'vehicle', vehicleId, img, name);
    }
  }
  for (var i = 0; i < newTeamObject.creatures.length; i++) {
    var creatureId = newTeamObject.creatures[i];
    var img = getAssetImage(creatureId, creaturesData);
    var name =  getAssetInfo(creatureId, 'name', creaturesData);
    if (img) {
      appendAssetImageAndId('#display_area', 'creature', creatureId, img, name);
    }
  }
}


function appendAssetImageAndId(div, assetType, assetId, img, name) {
  var $img = $('<img>').attr('src', img).css('width', '50px');
  var $name = $('<div>').text(name);
  var $box = $('<div>').addClass('team-item').append($img, $name);
  var $container = $("<div title='" + assetId + "'>").append($box);
  $(div).append($container);
}

function getAssetImage(asset, data){
  for(var i = 0; i < data.length; i++){
    if(asset === data[i].asset_id){
      return url_ipfs + data[i].data.img;
    }
  }
  return null;
}

function getAssetInfo(asset, get_data, data) {
  for (var i = 0; i < data.length; i++) {
    if (asset === data[i].asset_id) {
      return data[i].data[get_data];
    }
  }
  return null;
}

function isVehicleAllowed(asset_id, terrain){
  var vehicle_type = getImmutableData(asset_id, 'terrain', vehiclesData);
  if(vehicle_type === terrain){
    return true;
  } else {
    return false;
  }
}

function getImmutableData(asset, get_data, data) {
  for (var i = 0; i < data.length; i++) {
    if (asset === data[i].asset_id) {
      return data[i].template.immutable_data[get_data];
    }
  }
  return null;
}


function isInTeam(schema, item) {
  if (!myTeams.length) return {
    inTeam: false,
    teamId: 'No team!'
  };
  for (let i = 0; i < myTeams.length; i++) {
    if (schema === "vehicles" && myTeams[i].data.vehicles.includes(item.asset_id)) {
      return {
        inTeam: true,
        teamId: myTeams[i].team_id
      };
    } else if (schema === "creature" && myTeams[i].data.creatures.includes(item.asset_id)) {
      return {
        inTeam: true,
        teamId: myTeams[i].team_id
      };
    }
  }
  return {
    inTeam: false,
    teamId: 'No team!'
  };
}

function isTeamFull() {
  if(!newTeamObject.vehicles){return false;}
  if (newTeamObject.creatures.length < newTeamObject.capacity) {
    console.log('There is still room in team vehicle.')
    return false;
  } else {
    console.log('There is no room in team vehicle.')
    return true;
  }
}


function getMaxCapacity(asset_id, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].asset_id === asset_id) {
      return Number(data[i].data.capacity);
    }
  }
  return 0;
}


async function getTeams() {
  try {
    const response = await axios.get(`${domain_url}/teams/`);
    allTeams = response.data;
    return allTeams;
  } catch (error) {
    console.log(error);
  }
}

async function getPlayerTeams() {
  allTeams = await getTeams();
  myTeams = allTeams.filter(team => team.owner_id === playerData.wallet);
  allTeamsCreatures = myTeams.map(team => team.data.creatures);
  allTeamsVehicles = myTeams.map(team => team.data.creatures);
  console.log(myTeams)
  return myTeams;
}

function confirmTeam(){
  alert('clicked to create team: ' + newTeamObject.vehicles + ' ' + newTeamObject.creatures)
if(newTeamObject.vehicles.length>0 && newTeamObject.creatures.length>0){
  var newTeamName = generateTeamName();
  addTeam(newTeamName, newTeamObject.vehicles, newTeamObject.creatures);
  reloadPlayerData();
  $('#new-team-list').hide();
} else {
  alert('You must add at least 1x vehicle and 1x creature to confirm team.')
}
}

function cancelTeam(){
  newTeamObject.vehicles=[];
  newTeamObject.creatures=[];
  newTeamObject.capacity=0;
  $('#new-team-list').hide();
  reloadPlayerData();
}

function generateTeamName() {
    const flowers = ["Rose", "Tulip", "Daisy", "Lily", "Orchid", "Iris", "Poppy", "Luminous", "Sunia", "Lotus"];
    const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Orange", "Silver", "Gold", "Cyan", "Violet", "Azure"];
    const verbs = ["Jumping", "Twirly", "Flying", "Bouncing", "Sparkling", "Dazzling", "Sprinting", "Galloping", "Whirling", "Zooming"];
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    const flower = "Iris";
    const color = colors[Math.floor(Math.random() * colors.length)];
    const word1 = color;
    const word2 = verbs[Math.floor(Math.random() * verbs.length)];
    const romanNumeral = romanNumerals[Math.floor(Math.random() * romanNumerals.length)];
    const name = `${word1} ${word2} ${flower} ${romanNumeral}`;
    return name.length <= 22 ? name : null;
}



async function displayGlobalGXPBalance() {
  const globalGXPUrl = 'https://data.heroku.com/dataclips/ukbfbdifhndsmctwccoituvzqnrs.json';
  try {
    const response = await axios.get(globalGXPUrl);
    const data = response.data;
    const amt = abbreviateNumber(data.values[0][0]);
    $("#GXPTotalBalance").text(amt);
  } catch (error) {
    console.log(error);
  }
}

// Remember! All Modals are basically CRUD based. Most gameplay will be around these, so take your time!
// modals: all different list them, their data sets first, then their inputs, then the calculation needed+db calls

// map: fully functioning
// reward issuer
// zone-gxp payment modal

// map editor
// map: display other teams on map
// view item modal

// check if player has the nft, if not disable the adventure or team
// action log for players - versatile, expandable log system columns to deal with rentals, story, etc
// all checks for nfts in wallet before key aspects of game work:
// check if wallet contains this item: team vehicle asset id
// check if wallet contains this item: house asset id used by team
// check if user found in escrow > by renter id & asset id = this item found in escrow then OK
// polish
// mini game
// webpack, security and testing
// demo week

function getMapData() {
    allZones=[];
    axios.get(domain_url + '/players/zones').then((response) => {
        var data = response.data;
        for (var m in data) {
            allZones.push(data[m]);
        }
    }, (error) => {
        console.log(error);
    });
}

function displayWorlds() {
  // nav.world = 0;
  nav.zone = 0;
  updateNavButtons(0, 0);
  $('.map').empty();
  for (var i = 0; i < 4; i++) {
    var world = $('<div class="worldsquare"></div>');
    world.attr('id', i); // Add the ID to the world square
    if (nav.world === i) {
      world.addClass("world_on");
    } else {
      world.addClass("world_off");
    }
    world.attr('onclick', 'displayZones(this.id)');
    world.text("World " + (i + 1));
    for (var j in allZones) {
      if (allZones[j].mapgrid_4 === i) {
        world.text(allZones[j].zone_type + ' World');
        break; // Break the loop after finding the matching zone
      }
    }
    $('.map').append(world);
  }
}

async function displayZones(worldId) {
  nav.world = Number(worldId);
  changeTileOptions();
  // nav.zone = 0;
  nav.locale = 0;
  currentzonesJson = await getAllZonesFromWorldId(nav.world);

  updateNavButtons(nav.world, nav.zone);
  $('.map').empty();
  var zoneCounter = 0;
  for (var i in allZones) {
    if (allZones[i].mapgrid_4 === nav.world) {
      var zoneSquare = $('<div class="zonesquare"></div>');
      zoneSquare.attr('id', allZones[i].mapgrid_16);
      zoneSquare.text(allZones[i].zone_name);
      if (allZones[i].status === "locked") {
  zoneSquare.addClass("locked");
  zoneSquare.append(updatePayZoneModal(allZones[i].gxp_paid, allZones[i].gxp_required, allZones[i].status));
  zoneSquare.on("click", function() {
    nav.zone = Number(this.id);
    displayPayZoneModal();
  });
} else {
  zoneSquare.attr('onclick', 'displayLocales(this.id)');
  zoneSquare.addClass("uw_" + (nav.world + 1));
  if (nav.zone == allZones[i].mapgrid_16) {
    zoneSquare.addClass("z_on");
    var overlayImage = $('<div class="overlay-zone"></div>');
    zoneSquare.append(overlayImage);
  }


}

      var col = $('<div class="col-3"></div>');
      col.append(zoneSquare);
      $('.map').append(col);
      zoneCounter++;
      if (zoneCounter % 4 === 0) {
        $('.map').append('<div class="w-100"></div>');
      }
    }
  }
}

async function displayLocales(zoneId) {
  nav.zone = Number(zoneId);
  updateNavButtons(nav.world, zoneId);
  $('#mapEditorZoneSelected').html('<strong>Selected Zone:</strong> World #' + nav.world + ', Zone #' + nav.zone)
  var activeMoveIcons = [];
  for (var m in activeAdventures) {
    if (activeAdventures[m].status === 'In Progress' && Number(activeAdventures[m].mapgrid_4) === nav.world && Number(activeAdventures[m].mapgrid_16) === nav.zone) {
      activeMoveIcons.push(activeAdventures[m].mapgrid_256);
    }
  }

  $('.map').empty();
  var locales = []; // Initialize with an empty array

  for (a in allZones) {
    if (allZones[a].mapgrid_4 === nav.world && allZones[a].mapgrid_16 === nav.zone) {
      locales = allZones[a].data.locales;
    }
  }

  for (var i = 0; i < 256; i++) {
    var localeSquare = $('<div class="mapsquare"></div>');
    localeSquare.attr('id', locales[i].Locale);
    localeSquare.addClass(locales[i].Tile);

    if (activeMoveIcons.includes(i)) {
      var adv_icon = $("<div>").addClass("move_icon");
      localeSquare.text(locales[i].Locale_Name).prepend(adv_icon);
    } else {
      localeSquare.text(locales[i].Locale_Name);
    }

    $('.map').append(localeSquare);
    localeSquare.mouseover(function() {
      var locale = findLocaleInfo(this.id);
      $("#locale_btn").html(`${locale.Locale_Name}<br>Square #${locale.Locale}<br>Type: ${locale.Tile}`);
      $(this).addClass('tile-glow');
    });

    localeSquare.click(function() {
      newDestination.world = nav.world;
      newDestination.zone = nav.zone;
      newDestination.locale = this.id;
       nav.locale = this.id;
      var locale = findLocaleInfo(this.id);

      // map edit click

      if (mapEditorEnable==true){
          insertLocaleChangesIntoQueue();
          $('#map-editor-selection').html('<strong>Selected Area:</strong> World: ' + newDestination.world + ', Zone: ' + newDestination.zone + ', Locale: ' + newDestination.locale);
          $('#mapEditorLocaleName').val(locale.Locale_Name);
          $(this).attr("class", "mapsquare lava");
      }

      var title = locale.Locale_Name + "(#" + newDestination.locale + ")";
      var body = 'Send Team ID#' + teamSelectedForAdventure + ' to \n' +
        locale.Locale_Name + ' (' + newDestination.world + ', ' +
        newDestination.zone + ', ' + newDestination.locale + ')?' +
        '<br>Click Confirm to begin the adventure!';
      if (enableSetAdventure && isEnoughNectar()) {
        var team_vehicle = findTeamVehicle(teamSelectedForAdventure);
        alert(isVehicleAllowed(team_vehicle, locale.Terrain));
        displaySetLocationModal(title, body);
      }
    });

    localeSquare.mouseout(function() {
      hideTooltip();
      $(this).removeClass('tile-glow');
    });
  }
}

function getLocationName(zones, mapgrid_4, mapgrid_16, mapgrid_256) {
for (var a in zones) {
  if (zones[a].mapgrid_4 == mapgrid_4 && zones[a].mapgrid_16 == mapgrid_16){
    var locales = zones[a].data.locales;
    for (var i = 0; i < locales.length; i++) {
      if (locales[i].Locale == mapgrid_256){
        return locales[i].Locale_Name;
      }
    }
  }
}
return null;
}

function findTeamVehicle(team){
  for (let i = 0; i < myTeams.length; i++) {
  if (team == myTeams[i].team_id ) {
  return myTeams[i].data.vehicles[0];
  }}
}

function showTooltip(locale, tile, localeName) {
  var tooltip = $('#tooltip');
  tooltip.html(`${localeName}<br>${nav.zone} (#${locale})<br>Type: ${tile}`);
  tooltip.show();
}

function hideTooltip() {
  $('#tooltip').hide();
}

function findLocaleInfo(id) {
  for (var i = 0; i < allZones.length; i++) {
    if (allZones[i].mapgrid_4 == nav.world && allZones[i].mapgrid_16 == nav.zone) {
      var locales = allZones[i].data.locales;
      for (var j = 0; j < locales.length; j++) {
        if (locales[j].Locale == id) {
          return locales[j];
        }
      }
    }
  }
}

function getLocaleData(world, zone) {
  for (var i = 0; i < allZones.length; i++) {
    if (allZones[i].mapgrid_4 == world && allZones[i].mapgrid_16 == zone) {
      return allZones[i].data.locales;
      }
   }
}

function abbreviateNumber(number) {
	var SI_SYMBOL = ["", "k", "M", "B", "T", "Q", "QT"];
	var tier = Math.log10(Math.abs(number)) / 3 | 0;
	if (tier == 0) return number;
	var suffix = SI_SYMBOL[tier];
	var scale = Math.pow(10, tier * 3);
	var scaled = number / scale;
	return scaled.toFixed(1) + suffix;
}

function updateNavButtons(world, zone) {
  var w = Number(world) + 1;
  var z = Number(zone) + 1;

  // Remove "active" class from all buttons
  $(".btn-group .btn").removeClass("active");

  // Add "active" class to the appropriate button
  if (world !== null) {
    $("#world_btn").addClass("active");
    $("#world_btn").text("World: " + w);
  } else if (zone !== null) {
    $("#zone_btn").addClass("active");
    $("#zone_btn").text("Zone: " + z);
  } else {
    $("#locale_btn").addClass("active");
  }
}


function getZoneName(world, zone) {
    for (var i = 0; i < allZones.length; i++) {
        if (allZones[i].mapgrid_4 == world && allZones[i].mapgrid_16 == zone) {
            return allZones[i].zone_name;
        }
    }
}

function verifyIdentityAndMakePostCall(postUrl, postBody, successCallback, errorCallback) {
  wax.isApproved((isApproved) => {
    if (!isApproved) {
      wax.requestIdentity((response) => {
        // Handle response
      });
    } else {
      wax.getIdentity((identity) => {
        if (identity.publicKey === playerWallet) {
          // Make post call
          const options = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postBody)
          }
          fetch(postUrl, options)
            .then(response => response.json())
            .then(data => {
              successCallback(data);
            })
            .catch(error => {
              errorCallback(error);
            });
        } else {
          // Handle error, user is not authorized
          errorCallback("Error: Not authorized");
        }
      });
    }
  });
}

// this should go in Utils.js
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var currentzonesJson = [];
async function getAllZonesFromWorldId(world_id) {
  console.log('getting zones based on world id: ' + world_id)
	var zonesObject = [];
	for (var m in allZones) {
		if (allZones[m].mapgrid_4 == world_id) {
			zonesObject.push(allZones[m]);
		}
	}
  console.log('selected this zone object: ' + zonesObject)
	return zonesObject;
}


function createTeamConfirmModal() {
  var content = {
    'body': 'Create team body',
    'footer': 'Team confirm modal.'
  }
  createModal("team-confirm", content, "main-content");
  $('<button class="btn btn-primary" onclick="displayTeamConfirmModal()">Confirm Team</button>' +
    '<button class="btn btn-secondary" onclick="cancelTeam()">Cancel Team</button>').appendTo("#team-confirm-body");
}

async function displayTeamConfirmModal() {
  var body = 'New Team: \n';
  for (i in newTeamObject) {
    var assets = newTeamObject[i].vehicles;
    body += assets;
  }
  for (i in newTeamObject) {
    var assets = newTeamObject[i].creatures;
    body += assets;
  }
  $('#map-unlock').css('display', 'block');
  $("#map-unlock-title").text("Confirm Team");
  $("#map-unlock-body").text('Click confirm to create this team: ' + body);
  var newTeamName = generateTeamName();
  addTeam(newTeamName, newTeamObject.vehicles, newTeamObject.creatures);
  reloadPlayerData();

}



function createHowToPlayModal() {
var content = {'body':'How to play instructions will be shown here.', 'footer':''}
createModal("how-to-play", content, "main-content");
}

function displayHowToPlayModal() {
  var html = `
    <h5>1. Requirements</h5>
    <ul>
      <li>1 Vehicle - <a href="https://wax.atomichub.io/market?collection_name=cutecrushies&order=desc&schema_name=vehicles&sort=created&state=1&symbol=WAX">Purchase here</a></li>
      <li>1 Creature - <a href="https://wax.atomichub.io/market?collection_name=cutecrushies&order=desc&schema_name=creature&sort=created&state=1&symbol=WAX">Purchase here</a></li>
      <li>1 Nectar</li>
    </ul>
    <h5>2. Create a Team</h5>
    <ol>
      <li><strong>Login</strong>, under Inventory select 'Vehicles'</li>
      <li>Click <strong>Create New Team</strong> button on a vehicle you own</li>
      <li>Under Inventory, select 'Creatures'</li>
      <li>Click crushies to add them to your team</li>
      <li>Click <strong>Confirm Team</strong> to finalize your team</li>
      <li>New teams must nap a short time before being ready for adventuring</li>
    </ol>
      <h5>3. Start an Adventure</h5>
    <ol>
      <li>Once new team is 'Ready', under Teams, select 'Ready'</li>
      <li>Click <strong>Start Adventure</strong> button on your team, then click the map to set destination</li>
      <li>Click <strong>Confirm</strong>, then view the progress under Adventure, select 'In Progress'</li>
      <li>Claim rewards under Adventure, select 'Complete'</li>
      <li>To reduce nap times, purchase a House and assign a team to the house</li>
    </ol>
  `;

  $('#how-to-play-title').text('How to Play');
  $('#how-to-play-body').html(html);
  $('#how-to-play').css('display', 'block');
}



function createSetLocationModal() {
  var content = {'body':'Your new location is set modal.', 'footer':''}
  createModal("set-location", content, "main-content");

  let confirmButton = document.createElement("button");
  confirmButton.classList.add("btn", "btn-primary");
  confirmButton.innerText = "Confirm";
  confirmButton.addEventListener("click", function() {
    transactNectar(1);
    addAdventure(teamSelectedForAdventure);
     $('.inventory-item[data-team-id="' + teamSelectedForAdventure + '"]').remove();
    $('#set-location').css('display', 'none');
  });
  $('#set-location-footer').append(confirmButton);
}

async function displaySetLocationModal(title, body){
        $('#set-location-title').text('New Adventure to ' + title);
        $('#set-location-body').html(body);
        $('#set-location').css('display', 'block');
}

function createPayZoneModal(){
  var content = {'body':'this is a zone modal body', 'footer':''}
  createModal("map-unlock", content, "main-content");
}

 function updatePayZoneModal(gxp_paid, gxp_required, status) {
   var gxpContentDiv = $('<div class="zoneGxpBalances"></div>');
   var gxp_paid_abbr = gxp_paid < 100001 ? abbreviateNumber(gxp_paid) : gxp_paid;
   var gxp_required_abbr = gxp_required > 100000 ? abbreviateNumber(gxp_required) : gxp_required;
   var gxpContent = gxp_paid_abbr + " / " + gxp_required_abbr + " GXP";
   if (status === 'locked') {
     gxpContent += " (Locked)";
   }
   gxpContentDiv.text(gxpContent);
   return gxpContentDiv;
 }

 async function displayPayZoneModal() {
   $("#map-unlock-body").empty();
   $("#map-unlock-footer").empty();
   $('#map-unlock').css('display', 'block');
   var a = numberWithCommas(currentzonesJson[nav.zone].gxp_paid);
   var b = numberWithCommas(currentzonesJson[nav.zone].gxp_required);
   console.log("Type is: ")
   console.log(typeof playerData.gxp, playerData.gxp);
   var c = numberWithCommas(playerData.gxp.toFixed(2));
   var areaNumber = Number(nav.zone) + 1;
   var formElement = $("<form>").append(
     $("<fieldset>").addClass("uk-fieldset").append(
       $("<div>").addClass("uk-margin").append(
         $("<input>").addClass("uk-input").attr({id: "gxp_input", onfocus: "this.value=''", placeholder: "Enter an amount", type: "text"})
       )
     )
   );
   var contributeSpan = $("<p>").text('Contribute GXP to unlock this zone for everyone.');
   var gxpContributedSpan = $("<span>").attr("id", "map-unlock-gxp-contributed").text("Total Contributed By Players: " + a + " GXP");
   var gxpRequiredSpan = $("<span>").attr("id", "map-unlock-gxp-required").text("GXP Required to Unlock: " + b);
   var gxpBalanceSpan = $("<span>").attr("id", "map-unlock-gxp-balance").text("Your Balance: " + c + " GXP");

   var payButton = $("<button>").attr("type", "button").text("Pay");
   payButton.attr("id", "payButton");
   payButton.addClass("btn btn-primary");
   var cancelButton = $("<button>").addClass("btn btn-secondary").text("Cancel");
   cancelButton.on("click", function() {
     $('#map-unlock').hide();
   });

   var buttonLabels = ["25%", "50%", "75%", "100%"];
   var buttonValues = [25, 50, 75, 100];
   var buttons = $();
   $.each(buttonLabels, function(index, label) {
     var button = $("<button>").attr("type", "button").text(label);
       button.data("value", buttonValues[index]);
       button.addClass("btn btn-sm btn-light mr-2");
     button.on("click", function() {
       var value = $(this).data("value");
       calculatePayOption(b, value);
     });
     buttons = buttons.add(button);
   });

  payButton.on("click", function() {
      confirmZonePayment();
      $('#map-unlock').css('display', 'none');
      displayWorlds();
   });
    $("#map-unlock-title").text('Unlock Zone: ' + areaNumber);
    $("#map-unlock-body").append(contributeSpan, gxpRequiredSpan, gxpContributedSpan, gxpBalanceSpan, formElement, buttons);
    $('#map-unlock-footer').append(payButton);
    $('#map-unlock-footer').append(cancelButton);
 }



  // function calculatePayOption(gxpRequired, percent) {
  //   let newAmt;
  //   const gxp = Number(playerData.gxp);
  //   if (percent === 'required' && gxp > gxpRequired) {
  //     newAmt = gxpRequired;
  //   } else if (percent === 25 || percent === 50 || percent === 75 || percent === 100) {
  //     newAmt = gxp * (percent / 100);
  //     newAmt = newAmt.toFixed(2);
  //   } else {
  //     return;
  //   }
  //   $("#gxp_input").val(newAmt);
  // }

  function isEnoughNectar() {
  	if (playerData.nectar > 0) {
      alert("You have enough Nectar for vehicle: " + playerData.nectar);
  		return true;
  	} else if (playerData.nectar <= 0) {
      alert("Not enough nectar for vehicle: " + playerData.nectar);
  		return false;
  	}
  }

  function calculatePayOption(gxpRequired, percent) {
  let newAmt;
  const gxp = Number(playerData.gxp);

 if (percent === 25 || percent === 50 || percent === 75 || percent === 100) {
    newAmt = gxp * (percent / 100);
    newAmt = newAmt.toFixed(2);
    if (newAmt > gxpRequired) {
      newAmt = gxpRequired;
    }
  } else {
    return;
  }

  $("#gxp_input").val(newAmt);
}


  function confirmZonePayment() {
    var amt_to_pay = $("#gxp_input").val();
    amt_to_pay = Number(amt_to_pay);
    alert('You will pay: ' + amt_to_pay)
    var zone_gxp_req = getZoneInfo('gxp_required');
    var zone_id = getZoneInfo('id');
    if (zone_gxp_req < amt_to_pay) {
      alert("Overpayment! Cannot pay this amount: " + amt_to_pay + ' - Required GXP for Zone: ' + zone_gxp_req);
    } else if (amt_to_pay > 0) {
      alert('Attempting to pay GXP: ' + amt_to_pay)
      transactGXP(amt_to_pay);
      updateZoneBalance(zone_id, amt_to_pay);
      getMapData();
    }
  }

  function transactGXP(amt) {
  if (playerData.gxp >= amt) {
    playerData.gxp -= amt;
    playerData.gxp = Number(playerData.gxp.toFixed(3));
    updatePlayerBalances();
    alert('paid gxp successfully!')
  } else {
    alert('not enough gxp!')
    }
  }

  function transactNectar(amt) {
  if (playerData.nectar >= amt) {
    playerData.nectar -= amt;
    playerData.nectar = Number(playerData.nectar.toFixed(3));
    updatePlayerBalances();
    alert('paid nectar successfully!')
  } else {
    alert('not enough nectar!')
    }
  }

  function getZoneInfo(info) {
  alert("attempting to get zone info now: " + info)
    for (var i = 0; i < allZones.length; i++) {
      if (allZones[i].mapgrid_4 == nav.world && allZones[i].mapgrid_16 == nav.zone) {
        return allZones[i][info];
      }
    }
  }

async function updateZoneBalance(row_id, amt) {
  const total_gxp_zone = getZoneInfo('gxp_paid');
  const new_total_bal = (amt + Number(total_gxp_zone)).toFixed(2);
  const url = domain_url + '/players/zones/' + row_id;
  const change = {
    "gxp_paid": new_total_bal,
    "id": row_id
  };
  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await axios.put(url, change, options);
    console.log('success');
  } catch (error) {
    console.error(error);
  }
}


 function createTeamViewModal() {
   var content = {
     'body': 'This team has not been named.',
     'footer': ''
   }
   createModal("team-view", content, "main-content");
  }

async function displayTeamViewModal(teamid) {
  if (Object.keys(vehiclesData).length === 0 || Object.keys(creaturesData).length === 0) {
    await reloadPlayerData();
  }
  $('#team-view-body').empty();
  for (var i in myTeams) {
    if (myTeams[i].team_id == teamid) {
      var teamVehicles = myTeams[i].data.vehicles;
      var teamCreatures = myTeams[i].data.creatures;
      for (var j = 0; j < teamVehicles.length; j++) {
        var vehicleId = teamVehicles[j];
        var img = getAssetImage(vehicleId, vehiclesData);
        var name = getAssetInfo(vehicleId, 'name', vehiclesData);
        if (img) {
          appendAssetImageAndId('#team-view-body', 'vehicle', vehicleId, img, name);
        }
      }
      var creatureCount = teamCreatures.length;
      var creatureText = creatureCount === 1 ? 'creature' : 'creatures';

      for (var i = 0; i < creatureCount; i++) {
        var creatureId = teamCreatures[i];
        var img = getAssetImage(creatureId, creaturesData);
        var name = getAssetInfo(creatureId, 'name', creaturesData);
        if (img) {
          appendAssetImageAndId('#team-view-body', 'creature', creatureId, img, name);
        }
      }
      $('#team-view-title').text('Team #' + teamid + ' (' + creatureCount + ' ' + creatureText + ')');
    }
  }

  $('#team-view').css('display', 'block');
}

function createHouseAssignModal() {
  var content = {
    'body': '<div class="modal-list" id="modal-inventory">',
    'footer': ''
  }
  createModal("assign-house", content, "main-content");
  $('<button class="btn btn-primary" onclick="confirmTeam()">Confirm Team</button>' +
    '<button class="btn btn-secondary" onclick="cancelTeam()">Cancel Team</button>').appendTo("#team-confirm-body");
}

function displayHouseAssignModal(teamid) {
  var html = '<div class="modal-list" id="modal-inventory">';
  html += 'Setting a home base for your team reduces nap times between adventures.</div>';
  $('#assign-house-title').text('Select House for Team #' + teamid);
  $('#assign-house-body').html(html);
  displayModalInventory(teamid, 'selectHouse', 'houses');
  $('#assign-house').css('display', 'block');
}


function createModal(title, modaltext, mainId) {
  const main = document.getElementById(mainId);
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal");
  modalContainer.id = title;

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  modalContainer.appendChild(modalDialog);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalDialog.appendChild(modalContent);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  modalHeader.id = `${title}-header`;
  modalContent.appendChild(modalHeader);

  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.id = `${title}-title`;
  modalTitle.innerText = title;
  modalHeader.appendChild(modalTitle);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.id = `${title}-body`;
  modalBody.innerHTML = modaltext.body;
  modalContent.appendChild(modalBody);

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");
  modalFooter.id = `${title}-footer`;
  modalFooter.innerHTML = modaltext.footer;
  modalContent.appendChild(modalFooter);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.innerText = "Cancel";
  cancelButton.addEventListener("click", () => modalContainer.style.display = "none");
  modalFooter.appendChild(cancelButton);

  main.appendChild(modalContainer);
  return modalContainer;
}

async function addAdventure(team_id) {

  var bb = {
    "owner_id": playerData.wallet,
    "team_id": team_id,
    "init_steps": 100,
    "current_steps": 0,
    "mapgrid_4": newDestination.world,
    "mapgrid_16": newDestination.zone,
    "mapgrid_256": newDestination.locale,
    "status": "In Progress"
  };

  try {
    const response = await axios.post('https://express-crushie.herokuapp.com/adventures/', bb);
    console.log('Successfully added adventure');
    // update log
    displayGameLogs(playerData.wallet);
    // reload teams
    reloadPlayerTeamData();
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert('Oops! ' + error.response.data);
    }
    console.error(error);
  }
}

async function updatePlayerBalances() {
  const newDate = new Date();
  const url = `${domain_url}/players/${playerData.wallet}`;
  const gxp = parseFloat(playerData.gxp).toFixed(2);
  const change = {
    gxp: gxp,
    last_online: newDate,
    nectar: playerData.nectar,
    credits: playerData.credits,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.put(url, change, config);
    console.log('success');
  } catch (error) {
    console.error(error);
  }
}



function showAlert(message) {
  var alertElement = document.getElementById('main-alert');
  alertElement.innerHTML = message;
  alertElement.style.display = 'block';
}

var gameLog;
const getGameLogs = async () => {
  try {
    const response = await axios.get(`${domain_url}/players/logs/`);
    console.log(response);
    gameLog = response.data;
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving game logs');
  }
};

const displayGameLogs = async (wax_id) => {
  await getGameLogs();
  const playerLogList = document.getElementById('player-log-list');
  playerLogList.innerHTML = '';
  const filteredLog = gameLog.filter(log => log.status === 'new' && playerData.wallet === wax_id);
  filteredLog.forEach(log => {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const title = document.createElement('span');
    title.classList.add('card-title', 'fw-bold');
    title.style.marginBottom = '10px';
    title.textContent = (log.type).toUpperCase();
    const image = document.createElement('img');
    image.src = '../images/ui/info_icon.png';
    image.width = '16';
    const desc = document.createElement('p');
    desc.classList.add('card-text');
    desc.textContent = log.data.desc;
    const date = document.createElement('p');
    date.classList.add('card-text', 'text-muted');
    const createdAt = new Date(log.created_at);
    date.textContent = `${createdAt.toLocaleDateString()} - ${createdAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })} ${createdAt.toLocaleString('en-US', { timeZoneName: 'short' }).split(' ')[2]}`;
    cardBody.appendChild(image);
    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(date);
    card.appendChild(cardBody);
    playerLogList.appendChild(card);
  });
};



function changeTileOptions() {
  var selectedWorld = nav.world;
  var worldDropdowns = document.querySelectorAll('[id^="tileOptionsWorld"]');

  for (var i = 0; i < worldDropdowns.length; i++) {
    var dropdown = worldDropdowns[i];
    if (dropdown.id === 'tileOptionsWorld' + selectedWorld) {
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  }
}

async function updateMapZoneData(world, zone, jdata) {
  const url = `${domain_url}/players/zones/updatedata/${world}/${zone}`;
  const change = {
    mapgrid_4: world,
    mapgrid_16: zone,
    data: jdata
  };

  try {
    const response = await axios.put(url, change, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('success');
  } catch (error) {
    console.error('Error:', error);
  }
}

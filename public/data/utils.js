function getRandomProperty(obj) {
	var keys = Object.keys(obj);
	return obj[keys[keys.length * Math.random() << 0]];
}

function chunks(arr, size = 2) {
	return arr.map((x, i) => i % size == 0 && arr.slice(i, i + size)).filter((x) => x);
};

function getRandomName(array) {
	var x = array[Math.round(Math.random() * (array.length - 1))];
	return x;
}

async function getObjKeys(obj, value) {
	return Object.keys(obj).filter(key => obj[key] === value);
}

function makeid(length) {
	var result = "";
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

function shuffleFisherYates(array) {
	let i = array.length;
	while (i--) {
		const ri = Math.floor(Math.random() * (i + 1));
		[array[i], array[ri]] = [array[ri], array[i]];
	}
	return array;
}

function precise(x, y = 4) {
	return Number.parseFloat(x).toFixed(y);
}

function abbreviateNumber(number) {
	var SI_SYMBOL = ["", "k", "M", "B", "T", "Q", "QT"];
	// what tier? (determines SI symbol)
	var tier = Math.log10(Math.abs(number)) / 3 | 0;
	// if zero, we don't need a suffix
	if (tier == 0) return number;
	// get suffix and determine scale
	var suffix = SI_SYMBOL[tier];
	var scale = Math.pow(10, tier * 3);
	// scale the number
	var scaled = number / scale;
	// format number and add suffix
	return scaled.toFixed(1) + suffix;
}
function getFirstTwoWords(word) {
	var y = word.split(' ').slice(0, 2).join(' ');
	return y;
}
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function randomIntFromInterval(min, max) { // min and max included
	return Math.ceil(Math.random() * (max - min + 1) + min);
}

function randomIntFloor(min, max) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
 

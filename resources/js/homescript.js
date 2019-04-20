//for generating key words 
let cloudy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
cloudy[0] = "grey";
cloudy[1] = "gloom";
cloudy[2] = "fall";
cloudy[3] = "death";
cloudy[4] = "sadness";
cloudy[5] = "melancholy";
cloudy[6] = "calm";
cloudy[7] = "mellow";
cloudy[8] = "cloud";
cloudy[9] = "overcast";

let rainy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
rainy[0] = "rain";
rainy[1] = "drops";
rainy[2] = "water";
rainy[3] = "nature";
rainy[4] = "calm";
rainy[5] = "inside";
rainy[6] = "falling";
rainy[7] = "mellow";
rainy[8] = "flow";
rainy[9] = "wash";

let sunny = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
sunny[0] = "happy";
sunny[1] = "nature";
sunny[2] = "energetic";
sunny[3] = "move";
sunny[4] = "sun";
sunny[5] = "light";
sunny[6] = "shine";
sunny[7] = "hot";
sunny[8] = "clear";
sunny[9] = "glow";

let thunder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
thunder[0] = "thunder";
thunder[1] = "lightning";
thunder[2] = "boom";
thunder[3] = "crack";
thunder[4] = "metal";
thunder[5] = "rock";
thunder[6] = "flash";
thunder[7] = "fast";
thunder[8] = "bright";
thunder[9] = "dark";

let snow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
snow[0] = "chill";
snow[1] = "white";
snow[2] = "snow";
snow[3] = "christmas";
snow[4] = "relax";
snow[5] = "crystal";
snow[6] = "cold";
snow[7] = "freeze";
snow[8] = "flake";
snow[9] = "quiet";

function changeBackground(weatherID){
	if (weatherID >= 200 && weatherID <= 232){
		document.body.style.backgroundImage = "url('https://media.giphy.com/media/l2Sq3Xc55AemEfpwk/giphy.gif')";
	}
	else if (weatherID>=300&&weatherID<=531){
		document.body.style.backgroundImage = "url('https://media.giphy.com/media/dI3D3BWfDub0Q/giphy.gif')";
	}
	else if (weatherID>=600&&weatherID<=622)
	{
		document.body.style.backgroundImage = "url('https://media.giphy.com/media/7MP2oPL3wZRKg/giphy.gif')";
	}
	else if (weatherID>=701&&weatherID<=781){
		document.body.style.backgroundImage = "url('https://media.giphy.com/media/aAvJE6v5JStKE/giphy.gif')";
	}
	else if (weatherID==800){
		document.body.style.backgroundImage = "url('https://media.giphy.com/media/NWuqmpjHIXTdS/giphy.gif')";
	}
	else if (weatherID>=801&&weatherID<=804){
		document.body.style.backgroundImage = "url('https://media.giphy.com/media/37N1l3gxbGRCU/giphy.gif')";
	}

}

function keywordPicker(num) {
	var keywords = ["1", "2", "3"];
	var random1 = Math.floor(Math.random() * (9 - 0 + 1));
	var random2 = Math.floor(Math.random() * (9 - 0 + 1));
	var random3 = Math.floor(Math.random() * (9 - 0 + 1));

	console.log(num);

	if ((200 <= num && num < 300) || (700 <= num && num < 800)) {
		keywords[0] = thunder[random1];
		keywords[1] = thunder[random2];
		keywords[2] = thunder[random3];
	}
	else if ((300 <= num && num < 400 )|| (500 <= num && num < 600)) {
		keywords[0] = rainy[random1];
		keywords[1] = rainy[random2];
		keywords[2] = rainy[random3];
	}
	else if (600 <= num && num< 700) {
		keywords[0] = snow[random1];
		keywords[1] = snow[random2];
		keywords[2] = snow[random3];
	}
	else if (num == 800) {
		keywords[0] = sunny[random1];
		keywords[1] = sunny[random2];
		keywords[2] = sunny[random3];
	}
	else if (801 <= num && num < 900) {
		keywords[0] = cloudy[random1];
		keywords[1] = cloudy[random2];
		keywords[2] = cloudy[random3];
	}
	else{
		console.log("Weather ID error");
	}
	console.log(keywords);
	return keywords;   // The function returns an array of size 3 with keywordsq
}
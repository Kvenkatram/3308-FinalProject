var cloudy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

var rainy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

var sunny = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

var thunder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

var snow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

function keywordPicker(num) {
	var keywords = ["1", "2", "3"];
	var random1 = (int)(Math.random() * ((10) + 1));
	var random2 = (int)(Math.random() * ((10) + 1));
	var random3 = (int)(Math.random() * ((10) + 1));

	if (200 <= num < 300 || 700 <= num < 800) {
		keywords[0] = thunder[random1];
		keywords[1] = thunder[random2];
		keywords[2] = thunder[random3];
	}
	else if (300 <= num < 400 || 500 <= num < 600) {
		keywords[0] = rainy[random1];
		keywords[1] = rainy[random2];
		keywords[2] = rainy[random3];
	}
	else if (600 <= num < 700) {
		keywords[0] = snow[random1];
		keywords[1] = snow[random2];
		keywords[2] = snow[random3];
	}
	else if (num == 800) {
		keywords[0] = sunny[random1];
		keywords[1] = sunny[random2];
		keywords[2] = sunny[random3];
	}
	else if (801 <= num < 900) {
		keywords[0] = cloudy[random1];
		keywords[1] = cloudy[random2];
		keywords[2] = cloudy[random3];
	}
	else{
		message.innerHTML = "Weather type error";
	}

	return keywords;   // The function returns an array of size 3 with keywordsq
}
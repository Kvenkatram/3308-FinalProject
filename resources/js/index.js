KEY = "c4bfd6c17c9b7ce8d7a6d054dcce4b2e";

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city_name");
let temperature = document.getElementById("temp");
let weather = document.getElementById("weather");
let weathername = document.getElementById("savedWeather")
let btnselected = document.getElementById("bselected");
let create = document.getElementById("wsubmit")
let cityNameInput = document.getElementById("cityName");
let weatherId = document.getElementById("weatherId");
let wID = document.getElementById("savedID");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let curTemp = document.getElementById("curTemp");

searchBtn.addEventListener("click", getWeather);
searchInput.addEventListener("keyup", function(event){		// enter not working correctly
	if (event.keyCode === 13){
		searchBtn.click();
	}
});
function getWeather(){
	if (searchInput.value.length != 0 ){
		let requestLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&APPID="+KEY;
		openWeatherCaller(requestLink, responseHandler);
	}
}

function openWeatherCaller(url, callback){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = () =>{
		 if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
	}
	httpRequest.open("GET", url, true); // true for asynchronous
    httpRequest.send();
}

function responseHandler(response){
	let jObj = JSON.parse(response);
	cityName.innerHTML = jObj.name;
	weatherId.value = jObj.weather[0].id;
	wID.value = jObj.weather[0].id;
	cityNameInput.value = jObj.name;
	let tempVal = ((jObj.main.temp - 273.15) * 9/5) + 32;
	temperature.innerHTML = Math.round(tempVal) + " F";
	weather.innerHTML = jObj.weather[0].main;
	weathername.value = jObj.weather[0].main;
	curTemp.value = Math.round(tempVal);
	let minTempC = ((jObj.main.temp_min - 273.15) * 9/5) + 32;
	minTemp.value = Math.round(minTempC);
	let maxTempC = ((jObj.main.temp_max - 273.15) * 9/5) + 32;
	maxTemp.value = Math.round(maxTempC);
	//document.body.style.backgroundImage = "url('https://media.giphy.com/media/dI3D3BWfDub0Q/giphy.gif')";
}

function buttonHandler(weather){
	if (weather == 'currentWeather'){
		if(temperature.innerHTML == ''){
			alert("Please Enter Current Location");
			btnselected.innerHTML = '';
		} else {
			btnselected.innerHTML = 'Weather Selection: ' + weathername.value;
			weatherId.value = wID.value;
			create.style.visibility = 'visible';
		}
	}
	else if (weather == 'rain'){
		btnselected.innerHTML = 'Weather Selection: Rain';
		weatherId.value = 504;
		create.style.visibility = 'visible';
	}
	else if (weather == 'thunder'){
		btnselected.innerHTML = 'Weather Selection: Thunder';
		weatherId.value = 211;
		create.style.visibility = 'visible';
	}
	else if (weather == 'snow'){
		btnselected.innerHTML = 'Weather Selection: Snow';
		weatherId.value = 601;
		create.style.visibility = 'visible';
	}
	else if (weather == 'clear'){
		btnselected.innerHTML = 'Weather Selection: Clear';
		weatherId.value = 800;
		create.style.visibility = 'visible';
	}
	else if (weather == 'cloudy'){
		btnselected.innerHTML = 'Weather Selection: Cloudy';
		weatherId.value = 804;
		create.style.visibility = 'visible';
	}
}

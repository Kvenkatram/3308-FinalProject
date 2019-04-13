KEY = "";

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city_name");
let temperature = document.getElementById("temp");
let weather = document.getElementById("weather");
let cityNameInput = document.getElementById("cityName");
let weatherId = document.getElementById("weatherId");

searchBtn.addEventListener("click", getWeather);
searchInput.addEventListener("keyup", function(event){
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
	temperature.innerHTML = jObj.main.temp;
	weather.innerHTML = jObj.weather[0].description;
	weatherId.value = jObj.weather[0].id;
	cityNameInput.value = jObj.name;
	//cityNameInput.value = the weather id
	//document.body.style.backgroundImage = "url('https://media.giphy.com/media/dI3D3BWfDub0Q/giphy.gif')";
}

function buttonHandler(weather){


	if (weather == 'currentWeather'){
		if(temperature.innerHTML == ''){
			alert("Please Enter Current Location");
		}
	}
	else if (weather == 'rain'){
		cityName.innerHTML = 'Weather Selection: Rain';
		temperature.innerHTML = '';
		weather.innerHTML = '';
		cityNameInput.value = '';
	}
	else if (weather == 'thunder'){
		cityName.innerHTML = 'Weather Selection: Thunder';
		temperature.innerHTML = '';
		weather.innerHTML = '';
	}
	else if (weather == 'snow'){
		cityName.innerHTML = 'Weather Selection: Snow';
		temperature.innerHTML = '';
		weather.innerHTML = '';
	}
	else if (weather == 'clear'){
		cityName.innerHTML = 'Weather Selection: Clear';
		temperature.innerHTML = '';
		weather.innerHTML = '';
	}
	else if (weather == 'cloudy'){
		cityName.innerHTML = 'Weather Selection: Cloudy';
		temperature.innerHTML = '';
		weather.innerHTML = '';
	}

		
}
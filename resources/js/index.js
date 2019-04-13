KEY = "c4bfd6c17c9b7ce8d7a6d054dcce4b2e";

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city_name");
let temperature = document.getElementById("temp");
let weather = document.getElementById("weather");

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
	console.log(jObj);
	cityName.innerHTML = jObj.name;
	let tempVal = ((jObj.main.temp - 273.15) * 9/5) + 32;
	temperature.innerHTML = Math.round(tempVal) + " F";
	weather.innerHTML = jObj.weather[0].main;
	//document.body.style.backgroundImage = "url('https://media.giphy.com/media/dI3D3BWfDub0Q/giphy.gif')";
}

function buttonHandler(weather){
	if (weather == 'currentWeather')
		if(cityName.innerHTML != ''){
			alert("its good");
		}
		else{
			alert("Please Enter Current Location");
			return;
		}
}

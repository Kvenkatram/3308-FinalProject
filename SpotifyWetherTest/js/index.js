KEY = "";

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city_name");
let temperature = document.getElementById("temp");
let weather = document.getElementById("weather");

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
	//document.body.style.backgroundImage = "url('https://media.giphy.com/media/dI3D3BWfDub0Q/giphy.gif')";
}

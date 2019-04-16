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

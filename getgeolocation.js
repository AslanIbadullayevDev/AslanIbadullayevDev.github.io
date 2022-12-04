let city = document.querySelector("#cityname");
let long = document.querySelector("#longitude");
let lat = document.querySelector("#latitude");
let position = document.querySelector("#usecurrentposition");

function getGeoLocation()
{
    if('geolocation' in navigator)
    { 
        navigator.geolocation.getCurrentPosition(success);
    }
}

function success(position)
{
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;

    long.value = longitude;
    lat.value = latitude;

    console.log(longitude + " " + latitude);

}

function displayResult()
{
    if(position.checked)
    {
        getGeoLocation();
        city.disabled = true;
    }
    else
    {
        long.value = "";
        lat.value = ""; 
        city.disabled = false;
    }
}
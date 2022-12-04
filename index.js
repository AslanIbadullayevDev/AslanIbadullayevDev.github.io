
let cityname = document.querySelector("#cityname");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");
let currentposition = document.querySelector("#usecurrentposition");
function CityNameEntered()
{
    if(cityname.value.length > 0)
    {
        longitude.disabled = true;
        latitude.disabled = true;
        currentposition.disabled = true;
    }
    else
    {
        longitude.disabled = false;
        latitude.disabled = false;
        currentposition.disabled = false;
    }
}

function CoordinatesManuallyEntered()
{
    if(longitude.value.length > 0 || latitude.value.length > 0 )
    {
        cityname.disabled = true;
        currentposition.disabled = true;
    }
    else
    {
        cityname.disabled = false;
        currentposition.disabled = false;
    }
}
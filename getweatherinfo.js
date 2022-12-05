let longi = document.querySelector("#longitude");
let lati = document.querySelector("#latitude");

async function GetWeatherInfo()
{
    let countryflag = document.querySelector("#countryflag");
    countryflag.style.backgroundImage = "none";
    document.querySelector(".countryfullname").textContent = "";
    document.querySelector(".cityweatherinfo").style.visibility = "hidden";
    document.querySelector(".nonweatherinfo").style.visibility = "hidden";
    let apikey = "94076010b19f21f9418a0f8060042867"; // don't steal this please. I know, you are an instructor but i dont trust anyone
    ValidationCheckCoordinates();

    if(document.querySelector("#cityname").value.length > 0) {
    let response3 = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${document.querySelector("#cityname").value}&limit=1&appid=${apikey}`);
    let json3 = await response3.json();
    GetCountryFlag(json3);
    }
    else if(longi.value.length > 0 && lati.value.length > 0)
    {
        let response3 = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lati.value}&lon=${longi.value}&limit=1&appid=${apikey}`);
        let json3 = await response3.json();
        GetCountryFlag(json3);
        
    }
   
}

function ValidationCheckCoordinates()
{
    let regEx = /\d/;
    let error = document.querySelector(".validationerrormessage");
    if(document.querySelector("#cityname").value.length === 0 && longi.value.length === 0 && lati.value.length === 0)
    {
        error.textContent = "Enter either city name or the coordinates!";
        error.style.visibility = "visible";
    }
    else if(document.querySelector("#cityname").value.length > 0)
    {
        error.style.visibility = "hidden";
    }
    else if(longi.value.length === 0 || lati.value.length === 0)
    {
        error.textContent = "Enter all coordinates!";
        error.style.visibility = "visible";
    }
    else if(regEx.test(longi.value) === false || regEx.test(lati.value) === false)
    {
        console.log(regEx.test(longi.value));
        error.textContent = "Coordinates must be numbers!";
        error.style.visibility = "visible";
    }
    else
    {
        error.style.visibility = "hidden";
    }
}

async function GetCountryFlag(json3)
{
    let countrycode = json3[0].country;
    console.log(countrycode);
    let response =  await fetch(`https://restcountries.com/v3.1/alpha/${countrycode}`);
    let json =  await response.json();
    console.log(json);
    let countryflag = document.querySelector("#countryflag");
    let requestURL1 = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${json3[0].lat}&lon=${json3[0].lon}&appid=94076010b19f21f9418a0f8060042867`;
    let response1 = await fetch(requestURL1);
    let json1 = await response1.json();
    console.log(json1);
    ProvideNonWeatherData(json1);
    ProvideWeatherData(json1);
    document.querySelector(".cityweatherinfo").style.visibility = "visible";
    countryflag.style.backgroundImage = `url(${json[0].flags.svg})`;
    let finalStr = json3[0].name;
    if(json3[0].name.includes("City") || json3[0].name.includes("District"))
    {
        finalStr = json3[0].name.split(" ")[0];
    }
    document.querySelector(".countryfullname").textContent = finalStr +", " + json[0].name.official;
}


async function ProvideNonWeatherData(json1)
{
    let datetime = new Date();
    datetime.setTime(parseInt(json1.dt*1000));
    document.querySelector(".dt").textContent = datetime.toLocaleString();
    //Timezone
    datetime.setTime(parseInt(json1.sys.sunrise * 1000));
    document.querySelector(".sunrise").textContent = datetime.toLocaleString();
    datetime.setTime(parseInt(json1.sys.sunset * 1000));
    document.querySelector(".sunset").textContent = datetime.toLocaleString();
    document.querySelector(".table").style.visibility = "visible";
}

async function ProvideWeatherData(json1)
{
    document.querySelector(".current_temp").textContent = json1.main.temp + "\u2103";
    document.querySelector(".temp_max").textContent = json1.main.temp_max + "\u2103";
    document.querySelector(".temp_min").textContent = json1.main.temp_min + "\u2103";
    document.querySelector(".feels_like_temp").textContent = json1.main.feels_like + "\u2103";
    document.querySelector(".humidity").textContent = json1.main.humidity +"%";
    document.querySelector(".pressure").textContent = json1.main.pressure +"bar";
    
    document.querySelector(".weathercondition").textContent = json1.weather[0].main;
    document.querySelector(".detailed").textContent = json1.weather[0].description;

    document.querySelector(".speed").textContent = json1.wind.speed + "m/s";
    document.querySelector(".gust").textContent = json1.wind.gust;
    document.querySelector(".direction").textContent = (await DetermineWindDirection(json1.wind.deg));
}

async function DetermineWindDirection(degree)
{
    if(parseFloat(degree) >= 348.75 && parseFloat(degree) < 11.25)
    {
        return "North";
    }
    else if(parseFloat(degree) >= 11.25 && parseFloat(degree) < 33.75)
    {
        return "North-northeast";
    }
    else if(parseFloat(degree) >= 33.75 && parseFloat(degree) < 56.25)
    {
        return "North-east";
    }
    else if(parseFloat(degree) >= 56.25 && parseFloat(degree) < 78.75)
    {
        return "East-northeast";
    }
    else if(parseFloat(degree) >= 78.75 && parseFloat(degree) < 101.25)
    {
        return "East";
    }
    else if(parseFloat(degree) >= 123.75 && parseFloat(degree) < 146.25)
    {
        return "South-east";
    }
    else if(parseFloat(degree) >= 146.25 && parseFloat(degree) < 168.75)
    {
        return "South-southeast";
    }
    else if(parseFloat(degree) >= 168.75 && parseFloat(degree) < 191.25)
    {
        return "South";
    }
    else if(parseFloat(degree) >= 191.25 && parseFloat(degree) < 213.75)
    {
        return "South-southwest";
    }
    else if(parseFloat(degree) >= 213.75 && parseFloat(degree) < 236.25)
    {
        return "South-west";
    }
    else if(parseFloat(degree) >= 236.25 && parseFloat(degree) < 258.75)
    {
        return "West-southwest";
    }
    else if(parseFloat(degree) >= 258.75 && parseFloat(degree) < 281.25)
    {
        return "West";
    }
    else if(parseFloat(degree) >= 281.25 && parseFloat(degree) < 303.75)
    {
        return "West-northwest";
    }
    else if(parseFloat(degree) >= 303.75 && parseFloat(degree) < 326.25)
    {
        return "North-west";
    }
    return "North-northwest";
}

window.onload = function ()
{
    alert("Welcome to my Weather Tellep App! When you enter one of the fields below and hit the Get Weather Info, it may take short time. So dont think that it doesnt work. It works properly.")
}
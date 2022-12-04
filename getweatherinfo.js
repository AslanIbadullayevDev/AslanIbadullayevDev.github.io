let longi = document.querySelector("#longitude");
let lati = document.querySelector("#latitude");

async function GetWeatherInfo()
{
    let countryflag = document.querySelector("#countryflag");
    countryflag.style.backgroundImage = "none";
    document.querySelector(".countryfullname").textContent = "";
    let apikey = "94076010b19f21f9418a0f8060042867"; // don't steal this please. I know, you are an instructor but i dont trust anyone
    ValidationCheckCoordinates();


    let response3 = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${document.querySelector("#cityname").value}&limit=1&appid=94076010b19f21f9418a0f8060042867`);
    let json3 = await response3.json();

    GetCountryFlag(json3);

   
}

function ValidationCheckCoordinates()
{
    let regEx = /\d/;
    let error = document.querySelector(".validationerrormessage");
    if(longi.value.length === 0 || lati.value.length === 0)
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
    countryflag.style.backgroundImage = `url(${json[0].flags.svg})`;
    let finalStr = json3[0].name;
    if(json3[0].name.includes("City") || json3[0].name.includes("District"))
    {
        finalStr = json3[0].name.split(" ")[0];
    }
    document.querySelector(".countryfullname").textContent = finalStr +", " + json[0].name.official;
}




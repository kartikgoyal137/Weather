import { useState, useEffect } from "react";
import './weather.css'

function Weather()
{
    const [city, setCity] = useState("Patiala")
    const [newCity, setNewCity] = useState("Patiala")
    const [t, setT] = useState(0);
    const apiKEY = "49a6115be26041eb99e102333252405";
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${apiKEY}&q=${newCity}`;
    const [weatherData, setWeatherData] = useState(null);

    function changeCity(event)
    {
        setCity(event.target.value);
    }
    function changeNewCity()
    {
        setNewCity(city);
        setCity("")
    }    

    
    async function getData()
    {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();

        if (data.error) {
        setWeatherData({ location : {name: "", region : "", localtime:""} , current : {temp_c : "", humidity:"", wind_kph:"", condition : {text: "", icon : ""} } });
        } else {
        setWeatherData(data);
        setT(weatherData ? weatherData.current.temp_c : 0);
        }
        } catch (error) {
            setWeatherData({ location : {name:"" , region : "", localtime:""} , current : {temp_c : "", humidity:"", wind_kph:"", condition : {text: "", icon : ""} } });
        }
    }

    useEffect(() =>
    {
        getData();
    } , [newCity])

    return(
        <div>
          <section className="header">
            <h2 className="logo">Weather App</h2>
            <div className="search">
            <input type="text" placeholder="Enter city name..." value={city} onChange={changeCity} />
            <button onClick={changeNewCity}>Search</button>
            </div>
          </section>
            
          <section className="main">
            
            <div className={`temp ${(t<20) ? "blue" : (t>35) ? "red" : "green"}`}>
                {weatherData ? weatherData.current.temp_c : "Loading..."}°C
            </div>

            <h1 className="nameOfCity">
                {weatherData ? weatherData.location.name : ""}, {weatherData ? weatherData.location.region : ""} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {weatherData ? weatherData.location.localtime : ""}
            </h1>
            
            <div className="condition">
                <h1>{weatherData ? weatherData.current.condition.text : ""}</h1>
                <img src={weatherData ? weatherData.current.condition.icon : ""} alt="icon"/>
            </div>

            <div className="other">
                Humidity : {weatherData ? weatherData.current.humidity : ""} % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Wind speed : {weatherData ? weatherData.current.wind_kph : ""} kph
            </div>

          </section>

        </div>
    )
}

export default Weather
import './App.css';
import { useEffect, useState } from 'react';

const api = {
  key: "f2c7b5e4ad750ea65415a604d8b21dc5",
  base: "https://api.openweathermap.org/data/2.5/"
  // https://api.openweathermap.org/data/2.5/weather?q=delhi&APPID=f2c7b5e4ad750ea65415a604d8b21dc5
}


function App() {

  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState("");


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setLocation(event.target.value)
      event.target.value = "";
    }
  };


  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api.key}`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
  }, [location])

  console.log(weatherData);

  return (
    <>
    <div className='container' 
      style={{ 
        backgroundImage: `url(${'image/weather.jpg'})`,
        backgroundRepeat: 'no-repeat',
        width:'250px' ,
        height:'20rem',
      }}
    >

      <div className="App">
        <div>
          <input type="text" id="city" name="city" placeholder='Enter city name'
            onKeyDown={handleKeyDown} />
        </div>
        <div className='notfound' style={{ display: weatherData.cod === "404" ? 'block' : 'none' }}>{weatherData.message}</div>
        <div className='weatherdata' style={{ display: weatherData.cod == "200" ? 'block' : 'none' }} >
          <ul>
            <li className='city'>{weatherData.name},  {weatherData?.sys?.country}</li>
            <li className=''>Temperature: {Math.round(weatherData?.main?.temp - 273.15)}&deg;C</li>
            <li className=''>humidity: {weatherData?.main?.humidity}% </li>
            <li className=''>Wind: {weatherData?.wind?.speed}km/h</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;

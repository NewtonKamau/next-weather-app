import { converter } from '@/utils/converter';
import axios from 'axios';
import { Inter } from 'next/font/google'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const [inputVal, setInputVal] = useState("");
  const [currentCity, setCurrentCity] = useState({
    city: "", weather: "", pressure: "", humidity: "", wind: "", date: "", temp_f: "", wind_mile: ""
  });
  const [weatherArrayForecast, setWeatherArrayForecast] = useState([]);
  const changeHandler = (e) => {
    setInputVal(e.target.value)
  }
  const fetchFunction = async (inputVal) => {
    try {
      const {data} = await axios.get(`/api/weatherAPI?city=${inputVal}`);
      //deconstruct the value from data 
      const { weatherData } = data;
      setCurrentCity({
        ...currentCity,
        city: weatherData.location.name,
        weather: weatherData.current.condition.text,
        pressure: weatherData.current.pressure_mb,
        humidity: weatherData.current.humidity,
        wind: weatherData.current.wind_kph,
        date: weatherData.current.last_updated,
        temp_f: weatherData.current.temp_f,
        temp:weatherData.current.temp_c,
        wind_mile: weatherData.current.wind_mph
      })
      setWeatherArrayForecast(weatherData.forecast.forecastday)
      console.log(weatherArrayForecast);
    } catch (error) {
      console.log("Error occurred when fetching weather data ",error.message)
    }
  }
  return (
   <div className="bg-blue-300 mx-20 mt-20">
      <div className="flex justify-center items-center m-4">
        <input
          className="placeholder-grey-500 placeholder-opacity-50 focus-outline-none focus-ring-2 focus-ring-blue-600 border-2 border-gray-200 rounded-lg p-2 my-2"
          name="search-bar"
          id="search-bar-id"
          type="search"
          placeholder="Search city or zip code..."
          onChange={changeHandler}
        />
        
        <button onClick={()=>fetchFunction(inputVal)} className="m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
          Search 
        </button>
      </div>
      <div className="bg-amber-50 p-10">
        <h1 className='text-x1'> Your city: <span className='font-bold m-2'>{currentCity.city }</span></h1>
        <h3 className='text-sm my-2'>Weather:  <span className='font-bold m-2'>{ currentCity.weather}</span></h3>
        <h3 className='text-sm my-2'>Temperature:<span className='font-bold m-2'>{currentCity.temp} </span> </h3>
        <h3 className='text-sm my-2'>Humidity:  <span className='font-bold m-2'>{ currentCity.humidity}</span></h3>
        <h3 className='text-sm my-2'>Wind Speed: <span className='font-bold m-2'>{ currentCity.wind }</span></h3>
        <h3 className='text-sm my-2'>Date:  <span className='font-bold m-2'>{ currentCity.date }</span></h3>

      </div>
      <div className='m-6 font-bold'>
       10 Days Weather forecast
      </div>
      <div className="grid sm:grid-cols-3  sm-m-4 grid-col-1 gap-4 p-2">
        { weatherArrayForecast.map((value, index) => {
          if (index > 0) {
            return (
              <div key={index} className='bg-orange-100 rounded-md  shadow-md p-6'>
                <h4>Day:<span className='font-bold m-2'>{ converter(weatherArrayForecast[index].date) }</span>  </h4>
                <h4>Weather <span className='font-bold m-2'>{ value.day.condition.text}</span></h4>
                <h4>Min<span className='font-bold m-2'>{ value.day.mintemp_c }celcius</span></h4>
                <h4>Max <span  className='font-bold m-2'>{ value.day.maxtemp_c }celcius</span></h4>
              </div>
            )
          }

        }
        
          )}
        </div>
    </div>
  )
}

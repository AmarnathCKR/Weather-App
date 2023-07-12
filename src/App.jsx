import { useState } from "react";
import "./App.css";
import Location from "./components/Location";
import CurrentWeather from "./components/CurrentWeather";
import { foreCast, weatherApiKey, weatherApiUrl } from "./api/api";
import ForeCast from "./components/ForeCast";
import { PushSpinner } from "react-spinners-kit";

function App() {
  const [currentWeather, setWeather] = useState(null);
  const [currentForecast, setForecast] = useState(null);
  const [search, setSearch] = useState("kozhikode");
  const [loading,setLoading] = useState(false)
  
  const styles = {
    backgroundImage: `url("https://res.cloudinary.com/dqrpxoouq/image/upload/v1688369767/ct1iksngdvatvgv3bykn.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "cover",
  };

  const onDataChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(lat, lon);
    const currentWeatherFetch = fetch(
      `${weatherApiUrl}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );
    const foreCastFetch = fetch(
      `${foreCast}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );
    setLoading(true)
    Promise.all([currentWeatherFetch, foreCastFetch])
      .then(async (response) => {
        const weatherData = await response[0].json();
        const forecastData = await response[1].json();
        
        setForecast(null)
        setWeather(null)
        setWeather({ city: `${weatherData.name} ${weatherData.sys.country}`, ...weatherData });
        setForecast({ city: `${weatherData.name} ${weatherData.sys.country}`, ...forecastData });
        setLoading(false)
      })
      .catch((err) => {console.log(err);setLoading(false)});
  };

  return (
    <>
      <div style={styles} className={`w-full ${currentWeather ? "md:h-full h-screen" : "h-screen"} md:p-20 p-5 text-xs md:text-md`}>
      {loading && <div className="z-40  md:p-64 loader-local bg-secondary"> <PushSpinner size={30} color="#ffff" loading={loading} /></div>}
        <div className="w-full bg-black opacity-70 md:p-10 p-2 rounded-lg ">
          <p className="text-white md:text-3xl py-2 text-2xl font-bold text-center">
            Weather App
          </p>
          <Location search={search} setSearch={setSearch} onDataChange={onDataChange} />
          <div className="grid grid-cols-5 m-5 z-0">
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentForecast && <ForeCast data={currentForecast} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

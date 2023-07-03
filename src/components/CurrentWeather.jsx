/* eslint-disable react/prop-types */
function CurrentWeather({ data }) {
  return (
     <div className=" md:col-span-2 my-2 h-full col-span-5 items-center flex flex-col md:flex-row md:justify-center">
          <div className="w-full mx-14 transition duration-500 ease-in-out transform rounded-lg hover:scale-105 cursor-pointer border b-gray-400 flex flex-col justify-center items-center text-center p-2 bg-black">
            <div className="text-md font-bold flex flex-col text-white">
              <span className="uppercase">{data.city}</span>{" "}
              <span className="font-normal my-2 text-white text-sm">
                {new Date()
                  .toLocaleDateString("en", { day: "numeric", month: "long" })
                  .replace(/\d+(st|nd|rd|th)/, "$&")}
              </span>
            </div>
            <div className="grid grid-cols-6">
              <div className="col-span-3">
                <div className="w-32 h-32 flex items-center justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="weather"
                  />
                </div>
                <p className="text-white mb-2">{data.weather[0].description}</p>
                <div className="text-2xl font-bold text-white mb-3">
                  {data.main.temp}ºC
                </div>
              </div>
              <div className="col-span-3 ml-4 text-white mt-10 pb-1">
                    <p className="text-lg mb-4">Details</p>
                    <p className="text-sm text-start">Feels like : {Math.round(data.main.feels_like)}ºC</p>
                    <p className="text-sm text-start">Wind : {data.wind.speed} m/s</p>
                    <p className="text-sm text-start">Humidity : {data.main.humidity} %</p>
                    <p className="text-sm text-start">Pressure : {data.main.pressure} hPa</p>
                    
              </div>
            </div>
          </div>
        </div>

  );
}

export default CurrentWeather;

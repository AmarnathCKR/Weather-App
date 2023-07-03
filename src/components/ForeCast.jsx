/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./foreCast.css"
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function ForeCast({ data }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  return (
    <>
      <div className="text-white md:col-span-3 my-2 w-full h-full col-span-5 items-center flex flex-col md:flex-row md:justify-center">
        <div className="w-full mx-14 transition duration-500 ease-in-out transform rounded-lg hover:scale-105 cursor-pointer border b-gray-400 flex flex-col justify-center items-center text-center p-2 bg-black">
          <label className="title">Daily</label>
          <Accordion allowZeroExpanded>
            {data.list.splice(0, 7).map((item, idx) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="daily-item">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        className="icon-small"
                        alt="weather"
                      />
                      <label className="day">{forecastDays[idx]}</label>
                      <label className="description">
                        {item.weather[0].description}
                      </label>
                      <label className="min-max">
                        {Math.round(item.main.temp_max)}°C /
                        {Math.round(item.main.temp_min)}°C
                      </label>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                      <label>Pressure:</label>
                      <label>{item.main.pressure}</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Humidity:</label>
                      <label>{item.main.humidity}</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Clouds:</label>
                      <label>{item.clouds.all}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Wind speed:</label>
                      <label>{item.wind.speed} m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Sea level:</label>
                      <label>{item.main.sea_level}m</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Feels like:</label>
                      <label>{item.main.feels_like}°C</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default ForeCast;

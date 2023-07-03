/* eslint-disable react/prop-types */
import { AsyncPaginate } from "react-select-async-paginate";
import { options, url } from "../api/api";
import { useState } from "react";
import {BiCurrentLocation} from "react-icons/bi"

function Location({onDataChange ,search,setSearch}) {
const [loc,setLoc] = useState(null);
  const handleSearch = (value) => {
    setSearch(value);
    onDataChange(value);
  };

  const loadOptions = async(value)=>{
    try {
      const response = await fetch(`${url}?minPopulation=1000000&namePrefix=${value}`, options);
      const result = await response.json();
      console.log(result)
      return {
        options : result.data.map((item)=>{
          return{
            value : `${item.latitude} ${item.longitude}`,
            label : `${item.name} ${item.countryCode}`
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  }
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'black',
      border : "white",
      outline : "none",
      focusOutline : "none"
    }),
  };

  const getPosition = (
    options
  ) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  if(navigator.geolocation){
    getPosition().then((position) =>{setLoc( {lat : position.coords.latitude, lon : position.coords.longitude})}).catch(er => console.log(er))
  }

  const handleChange = ()=>{
    setSearch("");
    if(loc){
      onDataChange({value : `${loc.lat} ${loc.lon}`})
    }else{
      alert("Please Allow permission to access location")
    }
  }

  return (
    
    <div className="text-white md:text-lg text-sm items-center px-5 flex flex-col md:flex-row md:justify-center ">
      <div className="mx-5 w-full z-30 transition duration-500 ease-in-out transform  hover:scale-105 cursor-pointer border b-gray-400 flex items-center text-center p-2 bg-black">
        
        <AsyncPaginate styles={customStyles} className="md:w-full w-full text-black outline-none bg-black md:mx-3 z-50" debounceTimeout={700} placeholder="search for city" onChange={handleSearch} value={search} loadOptions={loadOptions} />
        <BiCurrentLocation onClick={handleChange} className="mx-3 hover:bg-slate-800 my-2" size="29px"/>
      </div>
    </div>
  );
}

export default Location;

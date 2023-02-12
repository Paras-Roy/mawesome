import React, { createContext, useState, useEffect, useRef } from 'react';

export const CityContext = createContext();

const CityContextProvider = (props) => {
  const [currentCity, setCurrentCity] = useState(null);
  const [pinnedCities, setPinnedCities] = useState([]);
  const mounted = useRef(false);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('weatherApp'));
    if (localData) {
      setCurrentCity(localData.currentCity);
      setPinnedCities(localData.pinnedCities);
    }
  }, []);


  useEffect(() => {
    if (mounted.current) {
      localStorage.setItem('weatherApp', JSON.stringify({ currentCity, pinnedCities }));
    } else {
      mounted.current = true;
      if(currentCity === null && pinnedCities.length === 0) {
        setCurrentCity('Delhi');
      }      
    }
  }, [currentCity, pinnedCities]);

  // useEffect(() => {
  //   if (!(currentCity === null && pinnedCities.length === 0)) {
  //     localStorage.setItem('weatherApp', JSON.stringify({ currentCity, pinnedCities }));
  //   }
  //   else if (!currentCity) {
  //     setCurrentCity('Delhi');
  //   }
  // }, [currentCity, pinnedCities]);

  const updateCurrentCity = (city) => {
    // localStorage.setItem('weatherApp', JSON.stringify({ currentCity:`${city}`, pinnedCities }));
    setCurrentCity(city);
  };

  const pinCity = (city) => {
    if (!pinnedCities.includes(city)) {
      // localStorage.setItem('weatherApp', JSON.stringify({ currentCity, pinnedCities: { ...pinnedCities, city } }));
      setPinnedCities([...pinnedCities, city]);
    }
  };

  const unpinCity = (city) => {
    setPinnedCities(pinnedCities.filter((c) => c !== city));
  };

  return (
    <CityContext.Provider value={{ currentCity, pinnedCities, updateCurrentCity, pinCity, unpinCity }}>
      {props.children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;

import React, { createContext, useState, useEffect } from 'react';

export const CityContext = createContext();

const CityContextProvider = (props) => {
  const [currentCity, setCurrentCity] = useState(null);
  const [pinnedCities, setPinnedCities] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('weatherApp'));
    if (localData) {
      setCurrentCity(localData.currentCity);
      setPinnedCities(localData.pinnedCities);
    }
  }, []);


  useEffect(() => {
    if (!(currentCity === null && pinnedCities.length === 0)) {
      localStorage.setItem('weatherApp', JSON.stringify({ currentCity, pinnedCities }));
    }
  }, [currentCity, pinnedCities]);

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

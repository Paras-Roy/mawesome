import { createContext, useState, useEffect, useRef } from 'react';

export const CityContext = createContext();

const CityContextProvider = (props) => {
  const [currentCity, setCurrentCity] = useState(null);
  const [pinnedCities, setPinnedCities] = useState([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      const localData = JSON.parse(localStorage.getItem('weatherApp'));
      if (localData) {
        setCurrentCity(localData.currentCity);
        setPinnedCities(localData.pinnedCities);
      } else {
        setCurrentCity('Delhi');
      }
      mounted.current = true;
    } else {
      localStorage.setItem('weatherApp', JSON.stringify({ currentCity, pinnedCities }));
    }
  }, [currentCity, pinnedCities]);

  const updateCurrentCity = (city) => {
    setCurrentCity(city);
  };

  const pinCity = (city) => {
    if (!pinnedCities.find(c => c.city === city)) {
      setPinnedCities([...pinnedCities, { key: Date.now().valueOf(), city }]);
    }
  };

  const unpinCity = (city) => {
    setPinnedCities(pinnedCities.filter((c) => c.city !== city));
  };

  return (
    <CityContext.Provider value={{ currentCity, pinnedCities, updateCurrentCity, pinCity, unpinCity}}>
      {props.children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;

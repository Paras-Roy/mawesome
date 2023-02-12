import { useState, useEffect, useContext } from 'react';
import styles from '../styles/PinWidget.module.css'
import { CityContext } from '@/context/cityContext';
import ClearIcon from '@mui/icons-material/Clear';

export default function PinnedCityWidget({ city }) {
    const [weatherData, setWeatherData] = useState(null);
    const { currentCity, pinnedCities, updateCurrentCity, pinCity, unpinCity } = useContext(CityContext);
    useEffect(() => {
        fetch(`https://mawesome-api.vercel.app/weather/${city}`)
            .then(res => res.json())
            .then(data => {
                setWeatherData(data);
            })
    }, [])
    return (
        <>
            {
                weatherData &&
                <div className={styles.pinWidget}>
                    <div className={styles.pinWidgetRibbon}>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="weather icon" />
                        <span>{weatherData.name}</span>
                        <button
                            onClick={() => unpinCity(city)}
                        ><ClearIcon fontSize="small" /></button>
                    </div>
                    <div className={styles.pinWidgetWeather} onClick={() => updateCurrentCity(city)}>
                        <div className={styles.pinWidgetLeft}>
                            <div className={styles.pinWidgetTemp}>
                                {Math.round(weatherData.main.temp)}°C
                            </div>
                            <div className={styles.pinWidgetWeatherDesc}>
                                {weatherData.weather[0].description}
                            </div>
                        </div>
                        <div className={styles.pinWidgetRight}>
                            <div className={styles.pinWidgetHumidity}>
                                Humidity: {weatherData.main.humidity}%
                            </div>
                            <div className={styles.pinWidgetWind}>
                                Wind: {weatherData.wind.speed}m/s
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
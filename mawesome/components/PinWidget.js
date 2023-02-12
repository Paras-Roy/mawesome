import { useState, useEffect, useContext } from 'react';
import styles from '../styles/PinWidget.module.css'
import { CityContext } from '@/context/cityContext';

export default function PinnedCityWidget({ city, id }) {
    //fetch weather data of city
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
                        <div className={styles.pinWidgetRibbonText}>{weatherData.name}</div>
                        <button
                            onClick={() => unpinCity(city)}
                        >Unpin</button>
                    </div>
                </div>
            }
        </>
    )
}
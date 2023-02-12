import styles from '../styles/Sidebar.module.css'
import { useState, useEffect, useContext } from 'react'
import { CityContext } from '@/context/cityContext';
import SearchIcon from '@mui/icons-material/Search';
import PinnedCityWidget from './PinWidget';

export default function Sidebar(props) {
    const [searchCity, setSearchCity] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { currentCity, pinnedCities, updateCurrentCity, pinCity, unpinCity } = useContext(CityContext);

    useEffect(() => {
        if (searchCity) {
            fetch(`https://mawesome-api.vercel.app/weather/${searchCity}`)
                .then(res => res.json())
                .then(data => {
                    updateCurrentCity(searchCity);
                    props.setWeather(data);
                    setNotFound(false);
                })
                .catch(err => {
                    setNotFound(true);
                    return;
                })
        }
    }, [searchCity])

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarSearchContainer}>
                <form
                    className={styles.sidebarSearchForm}
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            setSearchCity(e.target.city.value)
                        }

                    }>
                    <input type="text" name="city" placeholder="Search for a city"/>
                    <button type="submit">
                        Go
                    </button>
                </form>
                <div className={styles.pinContainer}>
                    <div className={styles.pinRibbon}>
                        <div className={styles.pinRibbonText}>Pinned Cities</div>
                        {
                            currentCity && (!pinnedCities.includes(currentCity)) &&
                            <button onClick={() => pinCity(currentCity)}>Pin {currentCity}</button>
                        }
                    </div>
                </div>
                {
                    pinnedCities.map((city, index) => {
                        return (
                            <PinnedCityWidget city={city} key={index} />
                        )
                    })
                }

                {
                    notFound &&
                    <h1 className={styles.notFound}>City not found</h1>
                }

            </div>
        </div>
    )

}
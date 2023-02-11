import styles from '../styles/Sidebar.module.css'
import { useState, useEffect, useContext } from 'react'
import { CityContext } from '@/context/cityContext';
import SearchIcon from '@mui/icons-material/Search';

export default function Sidebar() {
    const [searchCity, setSearchCity] = useState(null);
    const { currentCity, pinnedCities, updateCurrentCity, pinCity, unpinCity } = useContext(CityContext);
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarSearchContainer}>
                <form
                    className={styles.sidebarSearchForm}
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            updateCurrentCity(e.target.city.value)
                            pinCity(e.target.city.value)
                        }

                    }>
                    <input type="text" name="city" placeholder="Search for a city" />
                    <button type="submit">
                        Go
                    </button>
                </form>
            </div>
        </div>
    )

}
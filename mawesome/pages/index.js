import { useState, useEffect, useContext } from 'react';
import { CityContext } from '../context/cityContext';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export default function Home() {
  const [weather, setWeather] = useState(null);
  const { currentCity} = useContext(CityContext);


  useEffect(() => {
    if (currentCity) {
      const fetchData = async () => {
        const res = await fetch(`https://mawesome-api.vercel.app/weather/${currentCity}`);
        const data = await res.json();
        setWeather(data);
      };
      fetchData();
    }

  }, [currentCity]);

  useEffect(() => {
    if (weather) {
      const main = weather.weather[0].main;
      switch (main) {
        case 'Clouds':
          document.body.style.backgroundImage = "url('/bgs/cloudybg.jpg')";
          break;
        case 'Clear':
          document.body.style.backgroundImage = "url('/bgs/clearbg.jpg')";
          break;
        case 'Rain':
          document.body.style.backgroundImage = "url('/bgs/rainbg.jpg')";
          break;
        case 'Snow':
          document.body.style.backgroundImage = "url('/bgs/snowbg.jpg')";
          break;
        case 'Thunderstorm':
          document.body.style.backgroundImage = "url('/bgs/thunderbg.jpg')";
          break;
        case 'Drizzle':
          document.body.style.backgroundImage = "url('/bgs/drizzlebg.jpg')";
          break;
        default:
          document.body.style.backgroundImage = "url('/bgs/otherbg.jpg')";
          break;
      }
    }
  }, [weather]);

  if (weather) return (
    <div style={{ height: '100%' }}>
      <Head>
        <title>mawesome</title>
        <meta name="description" content="Weather app created by Paras Roy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.landingContainer}>
          <div className={styles.title}>
            <span>mawesome</span>
            <button className={styles.searchIcon} onClick={() => {
              //translate sidebar in from Right
              document.getElementById('sidebar').style.transform = 'translateX(0)';
            }}>
              <ManageSearchIcon fontSize="large" />
            </button>
          </div>
          <div className={styles.weatherWidgetContainer}>
            <div className={styles.weatherWidgetLeft}>
              <h2>
                {weather && (weather.main.temp | 0)}&#176;C
              </h2>
            </div>
            <div className={styles.weatherWidgetRight}>
              <div>
                {weather && weather.weather[0].main}
                {weather && (<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} height='60px' alt="weather icon" />)}
              </div>
              <h3>
                {weather && weather.name}, {weather && weather.sys.country}
              </h3>
            </div>
          </div>
        </div>
        <Dashboard />
        <Footer/>
      </div>
      <div className={styles.sidebar} id="sidebar">
        <Sidebar className={styles.sidebar} setWeather={setWeather} />
      </div>
    </div>
  )
  else return (
    <>
      <Head>
        <title>mawesome</title>
        <meta name="description" content="Weather app created by Paras Roy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main style={{ display: 'flex' }}>
        <div className={styles.mainContainer}>
          <div className={styles.landingContainer}>
            <h1 className={styles.title}>
              mawesome
            </h1>
            <div className={styles.weatherWidgetContainer}>
              <div className={styles.weatherWidgetRight}>
                <div>
                  Loading weather...
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

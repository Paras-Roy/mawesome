import { useState, useEffect, useContext } from "react";
import { CityContext } from "../context/cityContext";
import styles from "@/styles/Dashboard.module.css";


export default function Dashboard() {

    const { currentCity } = useContext(CityContext);
    const [weatherData, setWeatherData] = useState(null);
    const [selectedTab, setSelectedTab] = useState('current');

    useEffect(() => {
        fetch(`https://mawesome-api.vercel.app/weather/${currentCity}`)
            .then(res => res.json())
            .then(data => {
                setWeatherData(data);
            })
    }
        , [currentCity])

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.tabsContainer}>
                    <div className={styles.tabsRibbon}>
                        <span>Current Weather</span>
                    </div>
                    <div className={styles.widgetRow}>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Weather
                            </div>
                            <div className={styles.widgetDataValue}>
                                {/*  */}
                                {weatherData && weatherData.weather[0].description}
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Humidity
                            </div>
                            <div className={styles.widgetDataValue}>
                                {weatherData && weatherData.main.humidity}%
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Wind Speed
                            </div>
                            <div className={styles.widgetDataValue}>
                                {weatherData && weatherData.wind.speed}m/s
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Visiblity
                            </div>
                            <div className={styles.widgetDataValue}>
                                {weatherData && weatherData.visibility}m
                            </div>
                        </div>
                    </div>
                    <div className={styles.tabsRibbon}>
                        <span>24 Hours Forecast</span>
                    </div>
                    <div className={styles.widgetRow} id="bar">
                        {/* Add bar chart with echarts to display first 8 entries of forecast data = 24 hours */}

                    </div>
                    <div className={styles.tabsRibbon}>
                        <span>5 Day Forecast</span>
                    </div>
                    <div className={styles.widgetRow}>

                    </div>
                </div>
            </div>
        );
};

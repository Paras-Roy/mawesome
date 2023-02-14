import { useState, useEffect, useContext } from "react";
import { CityContext } from "../context/cityContext";
import styles from "@/styles/Dashboard.module.css";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale
);

export default function Dashboard() {

    const { currentCity } = useContext(CityContext);
    const [weatherData, setWeatherData] = useState(null);
    const [selectedTab, setSelectedTab] = useState('current');

    const dayData = {
        // labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        //labels are first 8 time in IST hrs format taken from the 5 day forecast data
        labels: weatherData && weatherData.list.map((item) => {
            const date = new Date(item.dt * 1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes}`;
        }).slice(0, 8),
        datasets: [
            {
                label: 'Temperature',
                data: weatherData && weatherData.list.map((item) => {
                    return item.main.temp;
                }).slice(0, 8),
                backgroundColor: 'transparent',
                borderColor: '#ff0000',
                fill: true,
                pointBackgroundColor: '#ff0000',
                pointHoverBackgroundColor: '#ff0000',
                hoverBackgroundColor: '#ff0000',
                hoverBorderColor: '#ff0000',
                pointRadius: 3,
                tension: 0.35,
            },
        ]
    };
    
    const options = {
        responsive: true,
        plugins: {
            //show legend only if the screen size is greater than 768px
            scales: {
                x: {
                    grid: {
                        display: true
                    },
                },
                y: {
                    ticks: {
                        stepSize: 2,
                        callback: function (value) {
                            return value + '°C';
                        }
                    },
                    grid: {
                        borderDash: [10],
                    }
                }
            }
        }
    }
    


    useEffect(() => {
        fetch(`https://mawesome-api.vercel.app/forecast/${currentCity}`)
            .then(res => res.json())
            .then(data => {
                setWeatherData(data);
            })
    }
        , [currentCity])
    
    

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    if(weatherData)
        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.tabsContainer}>
                    <div className={styles.tabsRibbon}>
                        <span>Today</span>
                    </div>
                    <div className={styles.widgetRow}>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Weather
                            </div>
                            <div className={styles.widgetDataValue}>
                                {/* take weather condition from 5 day forecast weather data */}
                                {weatherData && weatherData.list[0].weather[0].main}
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Humidity
                            </div>
                            <div className={styles.widgetDataValue}>
                                {weatherData && weatherData.list[0].main.humidity}%
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Wind Speed
                            </div>
                            <div className={styles.widgetDataValue}>
                                {weatherData && weatherData.list[0].wind.speed}m/s
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetDataTitle}>
                                Visiblity
                            </div>
                            <div className={styles.widgetDataValue}>
                                {weatherData && weatherData.list[0].visibility}m
                            </div>
                        </div>
                    </div>
                    <div className={styles.tabsRibbon}>
                        <span>Temperature</span>
                    </div>
                    <div className={styles.widgetRow} id="bar">
                        {/* Add bar chart with echarts to display first 8 entries of forecast data = 24 hours */}
                        <Line data = {dayData} options = {options}></Line>
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

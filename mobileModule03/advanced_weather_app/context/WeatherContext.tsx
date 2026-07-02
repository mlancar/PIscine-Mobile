import * as Location from 'expo-location';
import { createContext, useContext, useEffect, useState } from 'react';

type Place = {
        city: string;
        region: string;
        country: string;
    } | null;

const WeatherContext = createContext<{
    weekly: any;
    setWeekly: (value: any) => void;
    hourly: any;
    setHourly: (value: any) => void;
    weather: any;
    setWeather: (value: any) => void;
    currentPlace: any;
    setCurrentPlace: (value: any) => void;
    getWeather: (lat: number, lon: number, currentPlace?: Place) => Promise<void>;
    loadWeather: () => void;
    error: string | undefined;
    setError: (value: string | undefined) => void;

}>({
    weekly: null,
    setWeekly: () => {},
    hourly: null,
    setHourly: () => {},
    weather: null,
    setWeather: () => {},
    currentPlace: null,
    setCurrentPlace: () => {},
    getWeather: async() => {},
    loadWeather: () => {},
    error: undefined,
    setError: () => {},

});

export function WeatherProvider({ children }) {
    const [weather, setWeather] = useState();
    const [hourly, setHourly] = useState();
    const [weekly, setWeekly] = useState();
    const [error, setError] = useState<string | undefined>();

    const [currentPlace, setCurrentPlace] = useState<{
        city: string;
        region: string;
        country: string;
    } | null>(null);
    
    const getWeather = async(lat, lon, currentPlace: Place = null) => {
        setError(undefined);
        if (!currentPlace) {
            const [place] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
            setCurrentPlace({
                city: place.city ?? "",
                region: place.region ?? "",
                country: place.country ?? "",
            });
        }
        else {
            setCurrentPlace(currentPlace);
        }
        await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max`)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                return response.json();
        })
        .then((json) => {
            setWeather(json.current_weather)
            setHourly(json.hourly);
            setWeekly(json.daily);
        })
        .catch((error) => {
            console.error(error);
            setError('Something went wrong, please try again');
        })
    }

    const loadWeather = async () => {
        try {
            const { coords } = await Location.getCurrentPositionAsync({});
            const [place] = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
            setCurrentPlace({
                city: place.city ?? "",
                region: place.region ?? "",
                country: place.country ?? "",
            });
            getWeather(coords.latitude, coords.longitude);
        }
        catch (error) {
            console.log('Permission to access location was denied');
            setCurrentPlace(null);
        }
    };
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            loadWeather();
        })();
    }, []);

    return (
        <WeatherContext.Provider value={{ weather, setWeather, getWeather, currentPlace, setCurrentPlace, hourly, setHourly, weekly, setWeekly, loadWeather, error, setError }}>
        {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => useContext(WeatherContext);
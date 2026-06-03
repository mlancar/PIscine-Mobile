import * as Location from 'expo-location';
import { useEffect, useState, useContext, createContext } from 'react';

const WeatherContext = createContext<{
  weather: any;
  setWeather: (value: any) => void;
  currentPlace: any;
  setCurrentPlace: (value: any) => void;
  getWeather: (lat: number, lon: number) => void;
}>({
    weather: null,
    setWeather: () => {},
    currentPlace: null,
    setCurrentPlace: () => {},
    getWeather: () => {},
});

export function WeatherProvider({ children }) {
    // const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [weather, setWeather] = useState();
    const [currentPlace, setCurrentPlace] = useState<{
        city: string;
        region: string;
        country: string;
    } | null>(null);
    
    const getWeather = async(lat, lon, currentPlace: {city: string; region: string; country: string;} | null = null) => {
        if (!currentPlace) {
            const [place] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
            setCurrentPlace({
            city: place.city,
            region: place.region,
            country: place.country,
            });
        }
        else {
            setCurrentPlace(currentPlace); // placeName = { city, region, country }
        }
        await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then((response) => response.json())
        .then((json) => {
            setWeather(json.current_weather)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
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
        })();
    }, []);

    console.log(JSON.stringify(weather, null, 2));
    console.log(JSON.stringify(currentPlace, null, 2));

    return (
        <WeatherContext.Provider value={{ weather, setWeather, getWeather, currentPlace, setCurrentPlace }}>
        {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => useContext(WeatherContext);
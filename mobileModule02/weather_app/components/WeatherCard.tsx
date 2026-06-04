import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CurrentlyWeather from '@/components/CurrentlyWeather';
import TodayWeather from '@/components/TodayWeather';
import WeeklyWeather from '@/components/WeeklyWeather';

export default function WeatherCard({ mode, hourly, weather, currentPlace }) {

    if (mode === "currently") {
        return <CurrentlyWeather weather={weather} currentPlace={currentPlace} />;
    }
    if (mode === "today") {
        return <TodayWeather hourly={hourly} weather={weather} currentPlace={currentPlace} />;
    }
    if (mode === "weekly") {
        return <WeeklyWeather weather={weather} currentPlace={currentPlace} />;
    }
    return null;    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    info: {
        
    },
    text: {
        fontSize: 28,
    },
});
import { weatherCodes, weatherIcons } from '@/constants/weatherCodes';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CurrentlyWeather({ weather, currentPlace }) {

    console.log("weather code descrption: ", weather.weathercode);
    return(
    <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.city}> {currentPlace?.city},</Text>
            <Text style={styles.place}> {currentPlace?.region}, {currentPlace?.country}</Text>
            <Text style={styles.temperature}> {weather?.temperature}°C</Text>
            <Text style={styles.description}>{weatherCodes[weather?.weathercode]}</Text>
            <Ionicons name={weatherIcons[weather?.weathercode] || "help-circle"} size={48} color="white"/>
            <Text style={styles.wind}> {weather?.windspeed} km/h</Text>
        </View>
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    info: {
        flex: 1,
        gap: 30,
        paddingTop: 100,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    city: {
        fontSize: 24,
        color: 'white',
    },
    place: {
        color: 'white',
        fontSize: 28,
    },
    temperature: {
        color: '#f5e108',
        color: 'white',
        fontSize: 100,

    },
    description: {
        fontSize: 30,
        color: 'white',
    },
    wind: {
        fontSize: 22,
        color: 'white',

    },

});
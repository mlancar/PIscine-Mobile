import { weatherCodes } from '@/constants/weatherCodes';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CurrentlyWeather({ weather, currentPlace }) {

    return(
    <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.text}> {currentPlace?.city}</Text>
            <Text style={styles.text}> {currentPlace?.region}</Text>
            <Text style={styles.text}> {currentPlace?.country}</Text>
            <View style={{ flexDirection: 'row', gap: 20, padding: 20}}>
                <Text style={styles.text}> {weather?.temperature}°C</Text>
                <Text style={styles.text}>{weatherCodes[weather?.weathercode]}</Text>
                <Text style={styles.text}> {weather?.windspeed} km/h</Text>
            </View>
        </View>
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignSelf: "stretch",
    },
    info: {
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
    },
});
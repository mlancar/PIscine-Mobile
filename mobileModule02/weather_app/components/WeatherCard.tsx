import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function WeatherCard({ weather, currentPlace }) {

    return(
    <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.text}> {currentPlace?.city}</Text>
            <Text style={styles.text}> {currentPlace?.region}</Text>
            <Text style={styles.text}> {currentPlace?.country}</Text>
            <Text style={styles.text}> {weather?.temperature}</Text>
            <Text style={styles.text}> weather description</Text>
            <Text style={styles.text}> {weather?.windspeed}</Text>
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
        
    },
    text: {
        fontSize: 28,
    },
});
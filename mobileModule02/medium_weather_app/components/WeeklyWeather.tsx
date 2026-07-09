import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { weatherCodes } from '@/constants/weatherCodes';

export default function WeeklyWeather({ weekly, weather, currentPlace }) {

    const weeklyForecast =
    weekly?.time?.map((time, index) => ({
        id: index.toString(),
        time: time,
        temp_min: weekly.temperature_2m_min[index],
        temp_max: weekly.temperature_2m_max[index],
        windSpeed: weekly.wind_speed_10m?.[index],
    })) ?? [];

    return(
    <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.text}> {currentPlace?.city}</Text>
            <Text style={styles.text}> {currentPlace?.region}</Text>
            <Text style={styles.text}> {currentPlace?.country}</Text>
        </View>

        <View>
            <FlatList
                style={styles.list}
                data={weeklyForecast}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={[styles.text, styles.col]}>{item.time.slice(5)}</Text>
                        <Text style={[styles.text, styles.col]}>{item.temp_min}°C</Text>
                        <Text style={[styles.text, styles.col]}>{item.temp_max}°C</Text>
                        <Text style={[styles.text, styles.col]}>{weatherCodes[weather?.weathercode]}</Text>
                    </View>
                )}
            />
        </View>
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        padding: 12,
    },
    info: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 22,
    },
    col: {
        width: 100,
    },
    list: {
        padding: 12,
        alignSelf: "stretch",
    },
});
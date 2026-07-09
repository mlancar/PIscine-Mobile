import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { weatherCodes } from '@/constants/weatherCodes';

export default function TodayWeather({ hourly, weather, currentPlace }) {

    const forecast =
    hourly?.time?.map((time, index) => ({
        id: index.toString(),
        rawTime: time,
        time: time.substring(11, 16),
        temperature: hourly.temperature_2m[index],
        windSpeed: hourly.wind_speed_10m?.[index],
    })) ?? [];

    const today = new Date().toISOString().split("T")[0];

    const todayForecast = forecast.filter(item =>
    item.rawTime.startsWith(today)
    );
    
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
                data={todayForecast}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={[styles.text, styles.col]}>{item.time}</Text>
                        <Text style={[styles.text, styles.col]}>{item.temperature}°C</Text>
                        <Text style={[styles.text, styles.col]}>{weatherCodes[weather?.weathercode]}</Text>
                        <Text style={[styles.text, styles.col]}>{item.windSpeed} km/h</Text>
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
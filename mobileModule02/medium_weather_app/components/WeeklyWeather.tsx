import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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

        <View style={styles.weeklyInfo}>
            <FlatList
                style={styles.list}
                data={weeklyForecast}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', gap: 40,}}>
                        <Text style={styles.text}>{item.time}</Text>
                        <Text style={styles.text}>{item.temp_min}°C</Text>
                        <Text style={styles.text}>{item.temp_max}°C</Text>
                    </View>
                )}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            />
        </View>
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
    },
    info: {
        alignItems: 'center',
    },
    weeklyInfo: {
        alignSelf: "stretch",
        alignItems: 'center',

    },
    text: {
        fontSize: 24,
    },
    list: {
        padding: 12,
        alignSelf: "stretch",
    },
});
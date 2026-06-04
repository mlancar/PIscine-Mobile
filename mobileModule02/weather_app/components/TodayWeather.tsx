import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function TodayWeather({ hourly, weather, currentPlace }) {

    // const hourly = weather?.hourly;
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

        <View style={styles.hourlyInfo}>
            <FlatList
                style={styles.list}
                data={todayForecast}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', gap: 40,}}>
                        <Text style={styles.text}>{item.time}</Text>
                        <Text style={styles.text}>{item.temperature}°C</Text>
                        <Text style={styles.text}>{item.windSpeed} km/h</Text>
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
        // width: "100%",
    },
    info: {
        alignItems: 'center',
    },
    hourlyInfo: {
        // backgroundColor: 'red',
        alignSelf: "stretch",
        alignItems: 'center',

    },
    text: {
        // backgroundColor: 'blue',
        fontSize: 24,
    },
    list: {
        padding: 12,
        alignSelf: "stretch",
        // alignItems: 'center',
        // flex: 1,
    },
});
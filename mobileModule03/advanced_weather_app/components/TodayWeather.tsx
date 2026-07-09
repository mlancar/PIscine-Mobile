import { weatherIcons } from '@/constants/weatherCodes';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Directions } from 'react-native-gesture-handler';

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
            <Text style={styles.city}> {currentPlace?.city}</Text>
            <Text style={styles.place}> {currentPlace?.region}, {currentPlace?.country}</Text>
        </View>
        <View style={styles.chart}>
            <Text style={styles.title}>Today temperatures</Text>
            <LineChart
                data={{
                    labels: hourly.time.slice(0, 24).map((t, index) => index % 3 === 0 ? t.split('T')[1].slice(0, 5) : ''),
                    datasets: [
                        {
                            data: hourly.temperature_2m.slice(0, 24),
                        },
                    ],
                }}
                transparent={true}
                width={400}
                height={300}
                chartConfig={{
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                }}
                bezier
                style={{
                    backgroundColor: 'transparent',
                }}
            />
        </View>
        <View style={styles.hourlyInfo}>
            <FlatList
                style={styles.list}
                data={todayForecast}
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.hourlyInfoContent}>
                        <Text style={styles.text}>{item.time}</Text>
                        <Ionicons name={weatherIcons[weather?.weathercode] || "help-circle"} size={30} color="white"/>
                        <Text style={styles.text}>{item.temperature}°C</Text>
                        <View style={{flexDirection: "row", alignItems: 'center',}}>
                            <MaterialCommunityIcons name="weather-windy" size={20} color="#ffffff" />
                            <Text style={[styles.text, styles.wind]}>{item.windSpeed} km/h</Text>
                        </View>
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
        padding: 20,
        flex: 1,
        alignSelf: "stretch",
    },
    info: {
        alignItems: 'center',
    },
    chart: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        padding: 20,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    hourlyInfo: {
        alignSelf: "stretch",
        alignItems: 'center',
        paddingTop: 4,
    },
    hourlyInfoContent: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
    },
    city: {
        fontSize: 24,
        color: 'white',
    },
    place: {
        color: 'white',
        fontSize: 28,
    },
    text: {
        fontSize: 22,
        color: 'white',
    },
    wind: {
        padding: 6,
    },
    list: {
        padding: 12,
        alignSelf: "stretch",
    },
});
import { weatherIcons } from '@/constants/weatherCodes';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
            <Text style={styles.city}> {currentPlace?.city}</Text>
            <Text style={styles.place}> {currentPlace?.region}, {currentPlace?.country}</Text>
        </View>
        <View style={styles.chart}>
            <Text style={styles.title}>Weekly temparatures</Text>
            <LineChart
                data={{
                    labels: weeklyForecast?.map((item) => item.time.slice(5)),
                    datasets: [
                        {
                            data: weeklyForecast.map(item => item.temp_max),
                            color: () => "#e5540b",
                            strokeWidth: 3,
                        },
                        {
                            data: weeklyForecast.map(item => item.temp_min),
                            color: () => "#0260ac",
                            strokeWidth: 3,
                        },
                    ],
                }}
                transparent={true}
                width={400}
                height={300}
                chartConfig={{
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#ffffff",
                        fill: "#ffffff",
                    },
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: () => "#ffffff",
                }}
                bezier
                style={{
                    backgroundColor: 'transparent',
                }}
            />
            <View style={styles.legend}>
                <View style={styles.legendText}>
                    <Ionicons name="trending-down" color="#0260ac" size={18}/>
                    <Text style={{color: 'white', fontSize: 15 }}>Min temperature</Text>
                </View>
                <View style={styles.legendText}>
                    <Ionicons name="trending-up" color="#e5540b" size={18}/>
                    <Text style={{color: 'white', fontSize: 15}}>Max temperature</Text>
                </View>
            </View>
        </View>
        <View style={styles.weeklyInfo}>
            <FlatList
                style={styles.list}
                data={weeklyForecast}
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.weeklyInfoContent}>
                        <Text style={styles.text}>{item.time.slice(5)}</Text>
                        <Ionicons name={weatherIcons[weather?.weathercode] || "help-circle"} size={30} color="white" style={{ padding: 18}}/>
                        <Text style={[styles.text, {color: '#e5540b'}]}>{item.temp_max}°C max</Text>
                        <Text style={[styles.text, {color: '#0282eb'}]}>{item.temp_min}°C min</Text>
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
        // justifyContent: 'space-evenly',
        padding: 20,
    },
    chart: {
        alignItems: 'center',
        padding: 20,
        // justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 20,
        padding: 20,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    legend: {
        flexDirection: 'row',
        gap: 14,
        // padding: 10,
    },
    legendText: {
        flexDirection: 'row',
        gap: 4,
    },
    info: {
        alignItems: 'center',
    },
    weeklyInfo: {
        alignSelf: "stretch",
        alignItems: 'center',
    },
    weeklyInfoContent: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        gap: 8,

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
        color: 'white',
        fontSize: 22,
    },
    list: {
        padding: 12,
        alignSelf: "stretch",
    },
});
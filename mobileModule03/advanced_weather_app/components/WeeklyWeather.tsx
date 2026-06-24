import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { weatherIcons } from '@/constants/weatherCodes';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
                    labels: weeklyForecast?.time?.map((item) => item.time.slice(5)),
                    datasets: [
                        {
                            data: weeklyForecast.map(item => item.temp_max),
                        },
                        {
                            data: weeklyForecast.map(item => item.temp_min),
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
            <View style={styles.legend}>
                <Ionicons name="trending-down" color="blue"/>
                <Text style={{color: 'white'}}>Min temperature</Text>
                <Ionicons name="trending-up" color="red"/>
                <Text style={{color: 'white'}}>Max temperature</Text>
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
                        <Text style={styles.text}>{item.time}</Text>
                        <Ionicons name={weatherIcons[weather?.weathercode] || "help-circle"} size={30} color="white"/>
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
        justifyContent: 'space-evenly',
        padding: 20,
    },
    chart: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#e0e0e0',
        
    },
    legend: {
        flexDirection: 'row',
        // width: 100,
        // backgroundColor: 'red',
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
        gap: 20,
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
        fontSize: 24,
    },
    list: {
        padding: 12,
        alignSelf: "stretch",
    },
});
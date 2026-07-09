import TopBar from '@/components/TopBar';
import WeatherCard from '@/components/WeatherCard';
import { useWeather } from '@/context/WeatherContext';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function Today() {
  
  const goToToday = () => router.replace('/(tabs)/weekly');
  const goToHome = () => router.replace('/currently');

  const gesture = Gesture.Pan()
    .onEnd((e) => {
      if (e.translationX < -100) {
        runOnJS(goToToday)();
      }
      if (e.translationX > 100) {
        runOnJS(goToHome)();
      }
    });
  type City = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    region: string,
  };
  const [cities, setCities] = useState<City[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { weather, getWeather, currentPlace, hourly, error, setError } = useWeather();

  return (
  <GestureDetector gesture={gesture}>
    <View style={styles.container}>
      <TopBar
        setError={setError}
        input={input}
        setInput={setInput}
        setCities={setCities}
        setShowSuggestions={setShowSuggestions}
      />
      {showSuggestions && cities.length > 0 && (
        <FlatList
            style={styles.suggestion}
            data={cities}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                  onPress={() => {
                      setInput('');
                      setCities([]);
                      getWeather(item.latitude, item.longitude, {
                          city: item.name,
                          region: item.state,
                          country: item.country});
                      setShowSuggestions(false);
                  }}
              >
                <View style={styles.searchText}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                  <Text style={{ fontSize: 20, paddingLeft: 8, color: '#828384'}}>{item.region}, {item.country}</Text>
                </View>
            </TouchableOpacity>
            )}
          />
        )}
        <View style={styles.weatherContent}>
            {!currentPlace ? (
              <Text style={styles.textError} >Geolocation is not available, please enable it in your App settings</Text>
            ) : (
              <View>
              {error ? (
                <Text style={styles.textError} >{error}</Text>
                ) : (
                  <View>
                    <WeatherCard mode="today" hourly={hourly} weather={weather} currentPlace={currentPlace}></WeatherCard>
                  </View>
                )}
              </View>
            )}
          </View>
    </View>
  </GestureDetector>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  suggestion: {
    position: 'absolute',
    zIndex: 999,
    top: 119,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  searchText: {
    flexDirection: 'row',
    padding: 20,
    color: 'black',
    borderRadius: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#66b6d3',
  },
  weatherContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f7',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',

  },
  textError: {
    fontSize: 26,
    color: 'red',
    textAlign: 'center',
  },
  weatherCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    alignSelf: "stretch",

  },
});
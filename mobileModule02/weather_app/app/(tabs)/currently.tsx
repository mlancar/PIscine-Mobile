import TopBar from '@/components/TopBar';
import WeatherCard from '@/components/WeatherCard';
import { useWeather } from '@/context/WeatherContext';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Currently() {
    
  type City = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string,
  };
  const [cities, setCities] = useState<City[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { weather, getWeather, currentPlace, setCurrentPlace } = useWeather();
  const time = "currently";
  
    return (
    <View style={styles.container}>
      <TopBar
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
                      setCities([]);
                      getWeather(time, item.latitude, item.longitude, { city: item.name, region: item.admin1, country: item.country});
                      setShowSuggestions(false);
                  }}
              >
              <Text style={styles.searchText}>{item.name} ({item.country})</Text>
            </TouchableOpacity>
            )}
          />
        )}
        <View style={styles.weatherContent}>
          {!location ? (
            <Text style={styles.textError} >Geolocation is not available, please enable it in your App settings</Text>
          ) : (
            <View>
              {/* <Text style={styles.text} >Currently</Text> */}
              {/* <Text style={styles.text} >{location?.coords.latitude.toFixed(6)}.{location?.coords.longitude.toFixed(6)}</Text> */}
              <WeatherCard mode="currently" weather={weather} currentPlace={currentPlace}></WeatherCard>
            </View>
          )}
        </View>
        {/* <Text style={styles.text} >{searchInput}</Text> */}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  suggestion: {
    // padding: 12,
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
    padding: 18,
    fontSize: 22,
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
    backgroundColor: '#f2f5f8',
    fontSize: 30,
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
});
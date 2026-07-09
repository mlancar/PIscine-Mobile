import { StyleSheet, TextInput, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWeather } from '@/context/WeatherContext';

export default function TopBar( { setError, input, setInput, setCities, setShowSuggestions} ) {

  const { loadWeather} = useWeather();
  const searchCities = async (query) => {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=fr`);

    const json = await response.json();
    if (!json.results) {
      setCities([]);
      setError("City not found");
      return;
    }
    setError('');
    
    const formatted = (json.results || []).map((city, index) => ({
      id: index.toString(),
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      country: city.country,
      region: city.admin1,
    }));
    setCities(formatted);
    }
    catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#66b6d3" />
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(value) => {
              setInput(value),
              searchCities(value, setCities);
              setShowSuggestions(true);
            }}
            onSubmitEditing={() => {
                searchCities(input);
                setInput('');
            }}
            placeholder="Search location..."
          />
        </View>
        <View style={styles.sendContainer}>
          <Text style={{fontSize: 34, color: '#66b6d3', paddingRight: 18, paddingBottom: 4}}>|</Text>
          <TouchableOpacity onPress={() => { loadWeather() }}>
            <Ionicons name="location-outline" size={28} color="#66b6d3" paddingRight="10"/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  topBar: {
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    overflow: 'hidden',
  },
  sendContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    fontSize: 22,
    paddingLeft: 10,
    color: '#58f5f2',
    flex: 1,
  },
});

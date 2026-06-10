import { StyleSheet, TextInput, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Colors } from '@/constants/theme';
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
          <Ionicons name="search" size={24} color="white" />
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(value) => {
              setInput(value),
              searchCities(value, setCities);
              setShowSuggestions(true);
            }}
            onSubmitEditing={() => searchCities(input)}
            placeholder="Search location..."
          />
          
        </View>
        <View style={styles.sendContainer}>
          <Ionicons name="remove-outline" size={44} color="white" style={{ transform: [{ rotate: '90deg' }] }} />
          <TouchableOpacity onPress={() => { loadWeather() }}>
            <Ionicons name="paper-plane" size={24} color="white" paddingRight="10"/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
  },
  topBar: {
    height: 60,
    backgroundColor: Colors.primary.background,
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
    backgroundColor: Colors.primary.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: Colors.primary.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    fontSize: 22,
    paddingLeft: 10,
    color: 'white',
  },
});

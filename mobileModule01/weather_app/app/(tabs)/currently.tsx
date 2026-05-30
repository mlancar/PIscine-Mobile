import { View, Text, StyleSheet } from 'react-native';
import { useSearch } from '../context/SearchContext';

export default function Currently() {
    
    const { searchInput } = useSearch();
    return (
    <View style={styles.container}>
        <Text style={styles.text} >Currently</Text>
        <Text style={styles.text} >{searchInput}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 30,

  },
  text: {
    fontSize: 30,
  },
});
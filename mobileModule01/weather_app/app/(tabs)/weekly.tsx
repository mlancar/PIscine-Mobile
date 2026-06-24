import { StyleSheet, Text, View } from 'react-native';
import { useSearch } from '@/context/SearchContext';

export default function Weekly() {
    const { searchInput } = useSearch();
    
    return (
        <View style={styles.container}>
            <Text style={styles.text} >Weekly</Text>
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
  },
text: {
    fontSize: 30,
  },
});
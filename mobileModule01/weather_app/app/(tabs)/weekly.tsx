import { StyleSheet, Text, View } from 'react-native';
import { useSearch } from '@/context/SearchContext';
import { router } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export default function Weekly() {
      const { searchInput } = useSearch();
      const goToToday = () => router.replace('/(tabs)/today');
    
      const gesture = Gesture.Pan()
        .onEnd((e) => {
          if (e.translationX > 100) {
            runOnJS(goToToday)();
          }
        });
    return (
      <GestureDetector gesture={gesture}>
          <View style={styles.container}>
              <Text style={styles.text} >Weekly</Text>
              <Text style={styles.text} >{searchInput}</Text>
          </View>
      </GestureDetector>
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
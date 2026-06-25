import { useSearch } from '@/context/SearchContext';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export default function today() {

    const goToWeekly = () => router.replace('/(tabs)/weekly');
    const goToCurrently = () => router.replace('/(tabs)/currently');
  
    const gesture = Gesture.Pan()
      .onEnd((e) => {
        if (e.translationX < -100) {
          runOnJS(goToWeekly)();
        }
        if (e.translationX > 100) {
          runOnJS(goToCurrently)();
        }
      });
    const { searchInput } = useSearch();
    
    return (
      <GestureDetector gesture={gesture}>
          <View style={styles.container}>
              <Text style={styles.text} >Today</Text>
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
import { useSearch } from '@/context/SearchContext';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export default function Currently() {
  const goToToday = () => router.replace('/(tabs)/today');
  const goToHome = () => router.replace('/');

  const gesture = Gesture.Pan()
    .onEnd((e) => {
      if (e.translationX < -100) {
        runOnJS(goToToday)();
      }
      if (e.translationX > 100) {
        runOnJS(goToHome)();
      }
    });

    const { searchInput } = useSearch();
    return (
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
            <Text style={styles.text} >Currently</Text>
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
    fontSize: 30,

  },
  text: {
    fontSize: 30,
  },
});
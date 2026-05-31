import { StyleSheet } from 'react-native';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Pressable, Text } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="text" style={styles.text}>A simple text</ThemedText>
      <Pressable style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.6 : 1 }
        ]}
        onPress={() => console.log('Button pressed')} >
        <Text style={styles.buttonText} >Click Me</Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#ebebeb',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: '#416a1b',
    fontSize: 16,
  },
  text: {
    fontSize: 36,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#416a1b',
  },
});
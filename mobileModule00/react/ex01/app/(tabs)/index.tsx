import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, Text } from 'react-native';
import { useState } from 'react';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {

  const [text, setText] = useState('A simple text');
  const [isToggled, setIsToggled] = useState(false);

  // Les fonctions
  const changeText = () => {
    if (!isToggled) {
      setIsToggled(true);
      setText('Hello World');
    } else {
      setIsToggled(false);
      setText('A simple text');
    }
    console.log('Button pressed');
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="text" style={styles.text}>{text}</ThemedText>
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

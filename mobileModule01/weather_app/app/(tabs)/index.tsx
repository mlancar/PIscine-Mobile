import * as Device from 'expo-device';
import { Platform, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

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
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [searchInput, setsearchInput] = useState();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor="#ac3838"></StatusBar>
      <ThemedView style={styles.appBar}>
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(value) => setsearchInput(value)}
          placeholder="Search location..." >{searchInput}</TextInput>
      </ThemedView>
      {/* Display the input and result */}
      <ThemedView style={styles.resultContainer}>     
          <Text style={styles.inputText}>{input + "  "}</Text> {/* Show the current input */}
          <Text style={styles.resultText}>{result + " "}</Text> {/* Show the calculated result */}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
    marginBottom: 0,
    backgroundColor: Colors.primary.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  appBar: {
    height: 60,
    backgroundColor: Colors.primary.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,

  },
  appBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  input: {
    height: 40,
    fontSize: 22,

  },
  button: {
    // backgroundColor: '#5a858d',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 0,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: Colors.primary.background,

  },
  inputText: {
    fontSize: 36,
    color: '#5a858d',
  },
  resultText: {
    fontSize: 50,
    marginTop: 10,
    color: '#5a858d',

  },
  resetText: {
    color: '#8e0d0d',
  },
  operatorText: {
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 24,
    color: '#2f444a',
  },
});

import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Text } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

  const buttons: string[][] = [
    ['7', '8', '9', 'C', 'AC'], 
    ['4', '5', '6', '+', '-'], 
    ['1', '2', '3', 'x', '/'], 
    ['0', '.', '00', '=', ''],
  ];

  const [input, setInput] = useState('0');
  const [result, setResult] = useState('0');

  const handlePress = (btn) => {
    if (btn === 'C') {
      setInput(prev => prev.slice(0, -1) || '0');
    }
    else if (btn === 'AC') {
      setInput('0');
      setResult('0');
    }
    else if (btn === '=') {
      try {
        const res = eval(input.replace('x', '*'));
        setResult(res.toString());
      }
      catch(e) {
        setResult('Error');
      }
    }
    else {
      //write input
      setInput((prev) => prev === '0' ? btn : prev + btn);
      //si prev est egal a 0 alors remplace par btn sinon ajoute btn a la fin de prev
      //pour eviter d'avoir 09 au lieu de juste 9
    }
  }
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor="#ac3838"></StatusBar>
      <ThemedView style={styles.appBar}>
        <ThemedText style={styles.appBarTitle}>Calculator</ThemedText>
      </ThemedView>
      {/* Display the input and result */}
      <ThemedView style={styles.resultContainer}>     
          <Text style={styles.inputText}>{input + "  "}</Text> {/* Show the current input */}
          <Text style={styles.resultText}>{result + " "}</Text> {/* Show the calculated result */}
      </ThemedView>
      {buttons.map((row, rowIndex) => (
      <ThemedView key={rowIndex} style={styles.row}>
        {row.map((btn, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={styles.button}
            onPress={() => handlePress(btn)}
          >
            <Text style={[
                styles.buttonText,
                ['C', 'AC'].includes(btn) ? styles.resetText : null,
                ['+', '=', 'x', '/', '-'].includes(btn) ? styles.operatorText : null,
              ]}>
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
      </ThemedView>
    ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
    marginBottom: 0,
    backgroundColor: '#2f444a',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  appBar: {
    height: 60,
    backgroundColor: '#5a858d',
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
  button: {
    backgroundColor: '#5a858d',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 0,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#2f444a',
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

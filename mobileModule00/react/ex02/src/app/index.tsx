import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Pressable, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

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

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    try {
      if (input) {
        let finalInput = input.replace(/÷/g, '/');
        const evalResult = eval(finalInput);
        setResult(evalResult.toString());
      }
      else {
        // Clear the result if input is empty
        setResult('');
      }
      }
      catch (e) {
        // Handle invalid expressions gracefully
        setResult('');
      }
    },
    [input]);

  const handlePress = (btn) => {
    if (btn === 'C') {
      setInput('');
      // setResult('');
    }
    else if (btn === 'AC') {
      //clear input
      setInput('');
      setResult('');
    }
    else {
      //write input
      setInput((prev) => prev + btn);
    }
    // else if (btn === '=') {
    //   //equal
    // }
    // else if (btn === '+') {
    //   //add
    // }
    // else if (btn === '-') {
    //   //substract
    // }
    // else if (btn === 'x') {
    //   //multiply
    // }
    // else if (btn === '/') {
    //   //divide
    // }

  }
  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => handlePress(btn)} // Handle button press
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
      <ThemedView></ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
    marginBottom: 0,
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
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
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
  },
  resultText: {
    fontSize: 50,
    marginTop: 10,
    color: '#000000',
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

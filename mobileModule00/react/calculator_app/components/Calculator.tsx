import { StyleSheet, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/theme';

export default function Calculator() {

  const buttons: string[][] = [
    ['7', '8', '9', 'C', 'AC'], 
    ['4', '5', '6', '+', '-'], 
    ['1', '2', '3', 'x', '/'], 
    ['0', '.', '00', '=', ' '],
  ];

  const [input, setInput] = useState('0');
  const [result, setResult] = useState('0');

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

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
    <View style={styles.container}>
      <View style={[styles.resultContainer, { height: isPortrait ? 100 : 150 }] }>     
        <Text style={styles.inputText}>{input + "  "}</Text>
        <Text style={styles.resultText}>{result + " "}</Text>
      </View>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
        {row.map((btn, colIndex) => (
          <TouchableOpacity
          key={colIndex}
          style={[styles.button, { height: isPortrait ? 100 : 60 }]}
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
        </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2f444a',
  },
  button: {
    backgroundColor: Colors.light.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 0,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: Colors.dark.background,
    padding: 4,
  },
  inputText: {
    fontSize: 36,
    color: Colors.dark.text,
  },
  resultText: {
    fontSize: 50,
    marginTop: 10,
    color: Colors.dark.text,

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
    color: Colors.light.text,
  },
});

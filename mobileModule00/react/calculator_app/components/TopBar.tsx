import { StyleSheet, Text, View } from 'react-native';

export default function TopBar() {
  return (
    <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Calculator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    backgroundColor: '#5a858d',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    overflow: 'hidden',

  },
  topBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
});

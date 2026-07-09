import { StyleSheet, Text, View } from 'react-native';
import {GoogleAuth} from "@/components/Auth";

export default function HomeScreen() {

  return (
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME TO YOUR DIARY</Text>
        <GoogleAuth />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 22,
  }
});

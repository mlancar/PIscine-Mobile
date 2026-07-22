import { Text, TextProps, StyleSheet } from 'react-native';

export default function MyText({ style, ...props }: TextProps) {
  return <Text style={[styles.default, style]} {...props}></Text>
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'CourierPrime_400Regular',
  },
});
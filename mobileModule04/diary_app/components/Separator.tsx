import { StyleSheet, View } from 'react-native';

type colorProps = {
	color: string;
}
export default function Separator({color}: colorProps) {

  return (
    <View style={[styles.separator, {backgroundColor: color}]}></View>
  );
}

const styles = StyleSheet.create({
	separator: {
    height: 1,
    backgroundColor: '#000000',
    width: '100%',
    marginVertical: 16,
		zIndex: 99
  },
});
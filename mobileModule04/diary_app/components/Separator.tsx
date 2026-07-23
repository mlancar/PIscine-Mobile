import { StyleSheet, View } from 'react-native';

type colorProps = {
	color: string;
  size: number;
}
export default function Separator({color, size}: colorProps) {

  return (
    <View style={[styles.separator, {backgroundColor: color, height: size}]}></View>
  );
}

const styles = StyleSheet.create({
	separator: {
    zIndex: 999,
    width: '100%',
    marginVertical: 16,
		zIndex: 99
  },
});
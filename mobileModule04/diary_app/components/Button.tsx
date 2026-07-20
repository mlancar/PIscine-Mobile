import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type ButtonProps = {
    text: string;
    color?: string;
    onPress: () => void;
};

export default function Button({ text, color, onPress }: ButtonProps) {

  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	button: {
			borderRadius: 6,
			padding: 6,
	},
	text: {
		fontSize: 18,
		color: 'white',
	},
});
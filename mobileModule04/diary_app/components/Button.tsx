import MyText from '@/components/MyText';
import { StyleSheet, TouchableOpacity } from 'react-native';

type ButtonProps = {
    text: string;
    color?: string;
    textColor?: string;
    onPress: () => void;
};

export default function Button({ text, color, textColor, onPress }: ButtonProps) {

  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
        <MyText style={[styles.text, {color: textColor}]}>{text}</MyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	button: {
			borderRadius: 6,
			padding: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
	},
	text: {
		fontSize: 18,
		// color: '#3d3d3d',
	},
});
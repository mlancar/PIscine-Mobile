import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Image } from 'react-native';
import { useAuth } from '@/lib/useAuth';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyText from '@/components/MyText';
import { Colors, FontSize } from '@/constants/theme';

export default function ProfileCard() {
	const session = useAuth();

  return (
    <View style={styles.container}>
			<Image
				source={
					session?.user.user_metadata?.avatar_url
					? { uri: session?.user.user_metadata?.avatar_url }
					: require('@/assets/images/default-avatar.jpg')
				}
				style={styles.profilePicture}
			/>
			<View>
				<MyText style={styles.text}>{session?.user.user_metadata?.name}</MyText>
			</View>
			<TouchableOpacity onPress={() => console.log("Logout")}>
				<Ionicons name="log-out-outline" size={20} color='black'></Ionicons>
			</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
	},
	profilePicture: {
		borderWidth: 2,
		borderColor: Colors.light.icon,
		borderRadius: 80,
		width: 90,
		height: 90,
	},
	text: {
		color: Colors.light.text,
		fontSize: FontSize.xl,
	},
});
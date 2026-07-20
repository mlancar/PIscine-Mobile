import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Image } from 'react-native';
import { useAuth } from '@/lib/useAuth';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileCard() {
	const session = useAuth();
  // console.log(session?.user.user_metadata.avatar_url);

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
					<Text style={styles.text}>{session?.user.user_metadata?.name}</Text>
				</View>
				<TouchableOpacity onPress={() => console.log("Logout")}>
					<Ionicons name="log-out-outline" size={20} color='white'></Ionicons>
				</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
			// height: '90%',
			width: '100%',
			justifyContent: 'space-evenly',
			alignItems: 'center',
			flexDirection: 'row',
			padding: 4,
			// backgroundColor: 'blue',
	},
	profilePicture: {
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 80,
		zIndex: 99,
		width: 150,
		height: 150,
	},
	text: {
		color: 'white',
		fontSize: 22,
	},
});
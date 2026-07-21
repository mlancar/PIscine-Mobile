import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import Button from '@/components/Button';
import { Dispatch, SetStateAction } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';
import { Entry } from '@/types/entry';

type ModalCreateEntryProps = {
	modalVisible: boolean;
	setModalVisible: Dispatch<SetStateAction<boolean>>;
	onEntryCreated: (entry: Entry) => void;
};

export default function ModalCreateEntry({ modalVisible, setModalVisible, onEntryCreated}: ModalCreateEntryProps) {

	const feelings = ['😊', '😢', '😡', '😴', '😍'];
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [feeling, setFeeling] = useState<string | null>(null);
	const session = useAuth();

	const saveEntry = async () => {
		if (!session) {
			return;
		}
		const { data, error } = await supabase
			.from('entry')
			.insert({
				title,
				content,
				feeling,
				user_id: session.user.id,
			})
			.select();

		if (error) {
			console.log(error.message);
			return;
		}

		setTitle('');
		setContent('');
		setFeeling('');

		onEntryCreated?.(data[0]);
	}

  return (
    <Modal
			animationType='fade'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() =>
				setModalVisible(false)}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text>Add an entry</Text>
						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<Ionicons name="close" size={22} ></Ionicons>
						</TouchableOpacity>
						<TextInput
							value={title}
							onChangeText={setTitle}
							placeholder='Title'
							placeholderTextColor="#888"
							style={styles.titleInput}
							numberOfLines={1}
						/>
						<View style={styles.feelingRow}>
							{feelings.map((emoji) => (
									<TouchableOpacity
											key={emoji}
											onPress={() => setFeeling(emoji)}
											style={[
													styles.feelingButton,
													feeling === emoji && styles.feelingButtonSelected,
											]}
									>
											<Text style={styles.feelingEmoji}>{emoji}</Text>
									</TouchableOpacity>
							))}
					</View>
						<TextInput
							value={content}
							onChangeText={setContent}
							placeholder='Write something...'
							placeholderTextColor="#888"
							style={styles.contentInput}
							multiline={true}
							numberOfLines={8}
							scrollEnabled={true}
						/>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
							<Button text="Add" color='#76b24d' onPress={async () => {await saveEntry(); setModalVisible(false);}}/>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '70%',
    height: '40%',
    maxHeight: '40%',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    backgroundColor: '#e8e8e8',
    position: 'relative',
    padding: 24,
  },
  modalEntry: {

  },
  modalText: {
    fontSize: 18,
  },
  modalEntryContent: {
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
	titleInput: {
		borderWidth: 1,
    borderColor: '#070707',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 12,
		// height: 120,
	},
	contentInput: {
		borderWidth: 1,
    borderColor: '#070707',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 12,
		height: 120,
	},
	feelingRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	feelingButton: {
		padding: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		backgroundColor: 'white',
	},
	feelingButtonSelected: {
		borderColor: '#629fc4',
		backgroundColor: '#a5bfd4',
	},
	feelingEmoji: {
		fontSize: 24,
	},
});
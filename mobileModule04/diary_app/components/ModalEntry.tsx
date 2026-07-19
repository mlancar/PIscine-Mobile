import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ModalEntry({ selectedEntry, setSelectedEntry }) {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={!!selectedEntry}
            onRequestClose={() =>
                setSelectedEntry(null)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedEntry(null)}>
                    <Ionicons name="close" size={22} ></Ionicons>
                </TouchableOpacity>
                <Text style={styles.modalText}>{selectedEntry?.created_at.split('T')[0]}</Text>
                <View style={styles.separator}/>
                <Text style={styles.modalText}>My feeling : {selectedEntry?.feeling}</Text>
                <View style={styles.separator}/>
                <Text style={styles.modalEntryContent}>{selectedEntry?.content}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity>
                        <Text style={styles.deleteButton}>Delete this entry</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
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
  deleteButton: {
    fontSize: 18,
    backgroundColor: '#7c3636',
    color: 'white',
    borderRadius: 6,
    padding: 6,
    // width: '60%',
  },
  separator: {
    height: 2,
    backgroundColor: '#000000',
    width: '100%',
    marginVertical: 16,
  },
});
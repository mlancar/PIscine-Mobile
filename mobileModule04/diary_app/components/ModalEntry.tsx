import Button from '@/components/Button';
import type { Entry } from '@/types/entry';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dispatch, SetStateAction } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

  type ModalDetailProps = {
    selectedEntry: Entry | null;
    setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
  }

export default function ModalEntry({ selectedEntry, setSelectedEntry }: ModalDetailProps) {

  const deleteEntry = () => {
    console.log("delete entry")
  };

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
                <Button text="Delete this entry" color='#810d0d' onPress={() => console.log("Delete entry")}/>
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
  separator: {
    height: 2,
    backgroundColor: '#000000',
    width: '100%',
    marginVertical: 16,
  },
});
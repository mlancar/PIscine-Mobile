import Button from '@/components/Button';
import type { Entry } from '@/types/entry';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dispatch, SetStateAction } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { supabase } from '@/lib/supabase';
import MyText from '@/components/MyText';
import Separator from '@/components/Separator';

  type ModalDetailProps = {
    selectedEntry: Entry | null;
    setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
    onEntryDeleted: (id: string) => void;
  }

export default function ModalEntry({ selectedEntry, setSelectedEntry, onEntryDeleted }: ModalDetailProps) {

  const deleteEntry = async () => {
    if (!selectedEntry) {
      return;
    }
    const { data, error } = await supabase
      .from('entry')
      .delete()
      .eq('id', selectedEntry.id);

    if (error) {
      console.log(error.message);
      return;
    }
    onEntryDeleted?.(selectedEntry.id);
    setSelectedEntry(null);
  }

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
          <MyText style={styles.modalText}>{new Date(selectedEntry?.created_at ?? "").toLocaleDateString("en-US")}</MyText>
          <Separator color='#000000' size={1}/>
          <MyText style={styles.modalText}>My feeling : {selectedEntry?.feeling}</MyText>
          <Separator color='#000000' size={1}/>
          <ScrollView
            style={{maxHeight: 100, height: 100}}
            indicatorStyle='black'
            showsVerticalScrollIndicator={true}
          >
            <MyText style={styles.modalEntryContent}>{selectedEntry?.content}</MyText>
          </ScrollView>
          <View style={styles.button}>
            <Button text="DELETE" color='#810d0d' textColor='#f8f8f8' onPress={async () => {await deleteEntry(); setSelectedEntry(null); console.log("Delete entry")}}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    height: "100%",
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
    padding: 18,
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
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
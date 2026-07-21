import { GoogleAuth } from "@/components/Auth";
import Button from '@/components/Button';
import EntryCard from '@/components/EntryList';
import ModalCreateEntry from '@/components/ModalCreateEntry';
import ModalEntry from '@/components/ModalEntry';
import { useEntries } from '@/context/EntriesContext';
import { useAuth } from '@/lib/useAuth';
import type { Entry } from '@/types/entry';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const session = useAuth();
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { entries, setEntries } = useEntries();

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME TO YOUR DIARY</Text>
        <GoogleAuth />
      </View>
    );
  }

  return (
    <SafeAreaView  style={styles.container} edges={['top']}>
        <View style={styles.entryContainer}>
          <View style={{padding: 12}}>
            <Text style={{fontSize: 24}}>Your last diary entry</Text>
          </View>
        <EntryCard entries={entries} setSelectedEntry={setSelectedEntry}/>
        </View>
        <ModalEntry selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} onEntryDeleted={(deletedId) => setEntries((prev) => prev.filter((entry) => entry.id !== deletedId))}/>
        <ModalCreateEntry modalVisible={modalVisible} setModalVisible={setModalVisible} onEntryCreated={(newEntry) => setEntries((prev) => [newEntry, ...prev])}/>
        <View style={{paddingBottom: 16}}>
          <Button text="New diary entry" color='#426729' onPress={() => setModalVisible(true)}/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  entryContainer: {
    padding: 12,
    margin: 22,
    backgroundColor: '#712121',
    width: '90%',
    height: '85%',
    borderRadius: 8,
  },
});
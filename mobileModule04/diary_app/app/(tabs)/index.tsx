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
import MyText from '@/components/MyText';
import Separator from "@/components/Separator";

export default function HomeScreen() {

  const session = useAuth();
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { entries, setEntries } = useEntries();
  const today = new Date();

  const date = today.toLocaleDateString("en-EN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDay = date.toUpperCase();

  if (!session) {
    return (
      <View style={styles.container}>
        <MyText style={styles.text}>WELCOME TO YOUR DIARY</MyText>
        <GoogleAuth />
      </View>
    );
  }

  return (
    <SafeAreaView  style={styles.container} edges={['top']}>
      <View style={{marginTop: 16}}>
        <MyText style={{color: '#5f5f5f', fontSize: 12}}>{formattedDay}</MyText>
        <MyText style={{fontSize: 32, color: '#464646'}}>MY JOURNAL</MyText>
      </View>
      <Separator color='#000000' size={2}/>
      <View style={styles.entryContainer}>
        <MyText style={{fontSize: 20, color: '#656565', paddingBottom: 12}}>ALL ENTRIES</MyText>
        <EntryCard entries={entries} setSelectedEntry={setSelectedEntry}/>
      </View>
      <View style={{paddingBottom: 20}}>
        <Button text="+ NEW ENTRY" color='#f8f8f8' textColor='#080808'onPress={() => setModalVisible(true)}/>
      </View>
      <ModalCreateEntry modalVisible={modalVisible} setModalVisible={setModalVisible} onEntryCreated={(newEntry) => setEntries((prev) => [newEntry, ...prev])}/>
      <ModalEntry selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} onEntryDeleted={(deletedId) => setEntries((prev) => prev.filter((entry) => entry.id !== deletedId))}/>
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
    padding: 20,
    width: '90%',
    height: '80%',
    borderRadius: 8,
    justifyContent: 'flex-start',
  },
});
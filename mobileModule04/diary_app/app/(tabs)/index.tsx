import { GoogleAuth } from "@/components/Auth";
import Button from '@/components/Button';
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
import { FontSize, Colors } from "@/constants/theme";
import EntryList from "@/components/EntryList";

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

      <View style={styles.header}>
        <MyText style={{color: '#5f5f5f', fontSize: FontSize.small, paddingBottom: 12}}>{formattedDay}</MyText>
        <MyText style={{fontSize: FontSize.xxl, color: Colors.light.icon}}>MY JOURNAL</MyText>
        <Separator color='black' size={2}/>
      </View>

      <View style={styles.entryContainer}>
        <View style={{height: '90%', paddingBottom: 10}}>
          <MyText style={{fontSize: FontSize.large, color: Colors.light.text}}>ALL ENTRIES</MyText>
          <EntryList entries={entries} setSelectedEntry={setSelectedEntry}/>
        </View>

        <View style={{alignItems: 'center'}}>
          <Button text="+ NEW ENTRY" color={Colors.light.button} textColor='#080808'onPress={() => setModalVisible(true)}/>
        </View>

        <ModalCreateEntry modalVisible={modalVisible} setModalVisible={setModalVisible} onEntryCreated={(newEntry) => setEntries((prev) => [newEntry, ...prev])}/>
        <ModalEntry selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} onEntryDeleted={(deletedId) => setEntries((prev) => prev.filter((entry) => entry.id !== deletedId))}/>

      </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  header: {
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: Colors.light.text,
    fontSize: FontSize.medium,
  },
  entryContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});
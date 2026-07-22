import Button from '@/components/Button';
import EntryCard from '@/components/EntryCard';
import ModalCreateEntry from '@/components/ModalCreateEntry';
import ProfileCard from '@/components/ProfileCard';
import Separator from '@/components/Separator';
import { useEntries } from '@/context/EntriesContext';
import { useAuth } from '@/lib/useAuth';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Entry } from '@/types/entry';
import ModalEntry from '@/components/ModalEntry';
import MyText from '@/components/MyText';

export default function Profile() {

  const session = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { entries, setEntries } = useEntries();
  const lastEntry = entries[0];
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  if (session) {
    return (
      <SafeAreaView  style={styles.container} edges={['top']}>
        <View style={{width: '100%'}}>
          <ProfileCard/>
          <Separator color='white'/>
        </View>
        <View style={{flex: 1, width: '100%', justifyContent: 'space-between', padding: 8}}>
          <View style={{width: '100%', backgroundColor: '#923029', padding: 8, borderRadius: 8}}>
            <EntryCard setSelectedEntry={setSelectedEntry} item={lastEntry}/>
          </View>
          <ModalEntry selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} onEntryDeleted={(deletedId) => setEntries((prev) => prev.filter((entry) => entry.id !== deletedId))}/>
          <View style={styles.feelingContainer}>
            <MyText style={{fontSize: 20, paddingBottom: 12}}>FEELINGS</MyText>
            <View style={styles.feelingColumn}>
              <MyText style={styles.feelingEmoji}>😊 HAPPY</MyText>
              <MyText style={styles.feelingEmoji}>😐 NEUTRAL</MyText>
              <MyText style={styles.feelingEmoji}>😢 SAD</MyText>
              <MyText style={styles.feelingEmoji}>😡 ANGRY</MyText>
              <MyText style={styles.feelingEmoji}>😴 TIRED</MyText>
            </View>
          </View>
          <ModalCreateEntry modalVisible={modalVisible} setModalVisible={setModalVisible} onEntryCreated={(newEntry) => setEntries((prev) => [newEntry, ...prev])}/>
          <View style={{alignItems: 'center'}}>
            <Button text="New diary entry" color='#426729' onPress={() => setModalVisible(true)}/>
          </View>
        </View> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  text: {
    color: 'white',
    fontSize: 26,
  },
  button : {
    color: '#f9f9f9',
    backgroundColor: '#a2bbd8',
  },
  feelingContainer: {
    padding: 12,
    alignItems: 'center',
    height: '65%',
    backgroundColor: '#982f2f',
    borderRadius: 8
  },
  feelingColumn: {
		justifyContent: 'space-evenly',
    padding: 10,
    flex: 1,
    width: '100%',
    backgroundColor: '#5e4273',
    borderRadius: 8
	},
  feelingEmoji: {
		fontSize: 30,
	},
});

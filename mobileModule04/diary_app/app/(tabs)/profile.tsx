import Button from '@/components/Button';
import EntryCard from '@/components/EntryCard';
import ModalCreateEntry from '@/components/ModalCreateEntry';
import ProfileCard from '@/components/ProfileCard';
import Separator from '@/components/Separator';
import { useEntries } from '@/context/EntriesContext';
import { useAuth } from '@/lib/useAuth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Entry } from '@/types/entry';


export default function Profile() {

  const session = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { entries, setEntries } = useEntries();
  const lastEntry = entries[0];
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  console.log(session?.user.user_metadata);

  if (session) {
      return (
        <SafeAreaView  style={styles.container} edges={['top']}>
          <View style={{width: '100%'}}>
            <ProfileCard/>
            <Separator color='white'/>
          </View>
          <View style={{width: '100%'}}>
            <EntryCard setSelectedEntry={setSelectedEntry} item={lastEntry}/>
          </View>
          <View>
            <ModalCreateEntry modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <Button text="New diary entry" color='#426729' onPress={() => setModalVisible(true)}/>
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
    // backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 26,
  },
  button : {
    color: '#f9f9f9',
    backgroundColor: '#a2bbd8',
  },
});

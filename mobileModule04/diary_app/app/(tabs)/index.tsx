import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import {GoogleAuth} from "@/components/Auth";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import ModalEntry from '@/components/ModalEntry';

export default function HomeScreen() {

  type Entry = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    usermail: string;
    user_id: string;
  };

  const session = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  console.log("USER ID = ", session?.user.id);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('entry')
        .select('*');
      if (error) console.log(error.message);
      else setEntries(data);
      // console.log('DATA =', data);
      // console.log('ERROR =', error);
    };
    fetchData();
  }, []);

  const deleteEntry = () => {
    console.log("delete entry")
  };

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME TO YOUR DIARY</Text>
        <GoogleAuth />
      </View>
    );
  }
  console.log('SELECTED ENTRY =', selectedEntry);
  // console.log("ENTRIES AU RENDER =", entries);
  return (
      <SafeAreaView  style={styles.container} edges={['top']}>
        {/* <View>
          <Text style={styles.text}>Loggin as {session.user.email}</Text>
          </View> */}
          <View style={styles.entryContainer}>
            <View style={{padding: 12}}>
              <Text style={{fontSize: 24}}>Your last diary entry</Text>
            </View>
            <FlatList 
              data={entries}
              keyExtractor={(item) => String(item.id)}
              style={{ width: '100%', flex: 1}}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedEntry(item)}>
                  <View style={styles.entry}>
                    <Text style={styles.text}>{item.created_at.split('T')[0]}</Text>
                    <Text style={styles.text}>{item.feeling}</Text>
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <ModalEntry selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}></ModalEntry>
          <View style={{paddingBottom: 16}}>
            <TouchableOpacity style={styles.button} onPress={() => console.log("delete entry")}>
                <Text style={{color: 'white', fontSize: 16}}>New diary entry</Text>
            </TouchableOpacity>
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
  button : {
    padding: 8,
    // color: '#7c3636',
    backgroundColor: '#7c3636',
    borderRadius: 6,
  },
  entryContainer: {
    padding: 12,
    margin: 22,
    backgroundColor: '#712121',
    width: '90%',
    height: '85%',
    borderRadius: 8,
  },
  entry: {
    backgroundColor: '#614369',
    height: 90,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    marginBottom: 12,
  },
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
    padding: 28,
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
    color: '#d41111',

  },
  separator: {
    height: 2,
    backgroundColor: '#000000',
    width: '100%',
    marginVertical: 16,
  },
});

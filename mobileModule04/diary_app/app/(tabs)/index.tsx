import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {GoogleAuth} from "@/components/Auth";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';


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

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>WELCOME TO YOUR DIARY</Text>
        <GoogleAuth />
      </View>
    );
  }
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
              <View style={styles.entry}>
                <Text style={styles.text}>{item.created_at.split('T')[0]}</Text>
                <Text style={styles.text}>{item.feeling}</Text>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            )}
          />

          
        </View>
        <View style={{paddingBottom: 16}}>
          <TouchableOpacity style={styles.button}>
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
    color: '#7c3636',
    backgroundColor: '#7c3636',
    borderRadius: 6,
  },
  entryContainer: {
    padding: 12,
    margin: 22,
    backgroundColor: '#712121',
    width: '90%',
    height: '85%',
    // alignItems: 'center',
    // gap: 8,
  },
  entry: {
    backgroundColor: '#614369',
    height: 90,
    // justifyContent: 'center',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // gap: 8,
    marginBottom: 12,
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {GoogleAuth} from "@/components/Auth";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@react-navigation/elements';

export default function Profile() {

  const session = useAuth();

  if (session) {
      return (
          <View style={styles.container}>
            <Text style={styles.text}>Your last diary entry</Text>
            <View>
                <Text>Diary entry</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text>New diary entry</Text>
            </TouchableOpacity>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

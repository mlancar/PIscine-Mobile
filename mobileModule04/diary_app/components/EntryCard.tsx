import type { Entry } from '@/types/entry';
import { Dispatch, SetStateAction } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type EntryProps = {
  item: Entry;
  setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
}

export default function EntryCard({setSelectedEntry, item}: EntryProps) {

  return (
    <TouchableOpacity onPress={() => setSelectedEntry(item)}>
      <View style={styles.entry}>
        <Text style={styles.text}>{item.created_at.split('T')[0]}</Text>
        <Text style={styles.text}>{item.feeling}</Text>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
      color: 'black',
      fontSize: 16,
  },
  entry: {
      backgroundColor: '#614369',
      height: 90,
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderRadius: 8,
      margin: 6,
  },

});
import type { Entry } from '@/types/entry';
import { Dispatch, SetStateAction } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MyText from '@/components/MyText';
import MyBoldText from '@/components/MyBoldText';

type EntryProps = {
  item: Entry;
  setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
}

export default function EntryCard({setSelectedEntry, item}: EntryProps) {

  return (
    <TouchableOpacity onPress={() => setSelectedEntry(item)}>
      <View style={styles.entry}>
        <View style={styles.upperEntry}>
          <MyText style={styles.text}>{new Date(item.created_at).toLocaleDateString("en-US")}</MyText>
          <MyText style={styles.text}>{item.feeling}</MyText>
        </View>
        <View style={{gap: 8}}>
          <MyBoldText style={[styles.text, {fontSize: 20}]}>{item.title.toUpperCase()}</MyBoldText>
          <MyText style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.content} </MyText>
        </View>
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
      backgroundColor: '#fcfbfb',
      height: 100,
      padding: 12,
      borderRadius: 8,
      margin: 8,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  },
  upperEntry: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
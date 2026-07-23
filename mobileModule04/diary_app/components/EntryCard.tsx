import type { Entry } from '@/types/entry';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MyText from '@/components/MyText';
import MyBoldText from '@/components/MyBoldText';
import { Shadows, FontSize, Colors } from '@/constants/theme';

type EntryProps = {
  item: Entry;
  setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
}

export default function EntryCard({setSelectedEntry, item}: EntryProps) {

  return (
    <TouchableOpacity hitSlop={15} onPress={() => setSelectedEntry(item)}>
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
      color: Colors.light.darkText,
      fontSize: FontSize.medium,
  },
  entry: {
      backgroundColor: Colors.light.foreground,
      height: 100,
      padding: 12,
      borderRadius: 8,
      margin: 8,
      ...Shadows.card,
  },
  upperEntry: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
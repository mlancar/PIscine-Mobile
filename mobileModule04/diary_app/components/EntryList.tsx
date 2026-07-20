import type { Entry } from '@/types/entry';
import { Dispatch, SetStateAction } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EntryCard from '@/components/EntryCard';

type entryProps = {
	entries: Entry[];
	setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
}

export default function EntryList({ entries, setSelectedEntry }: entryProps) {

  const deleteEntry = () => {
    console.log("delete entry")
  };

  return (
    <FlatList 
			data={entries}
			keyExtractor={(item) => String(item.id)}
			style={{ width: '100%', flex: 1}}
			renderItem={({ item }) => (
				<EntryCard item={item} setSelectedEntry={setSelectedEntry}/>
    	)}
    />
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
			marginBottom: 12,
	},

});
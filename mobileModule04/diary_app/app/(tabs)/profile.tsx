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
import { Shadows, FontSize, Colors } from '@/constants/theme';

export default function Profile() {

  const session = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { entries, setEntries } = useEntries();
  const lastEntry = entries[0];
  const lastLastEntry = entries[1];
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  
	const feelings = ['😊', '😐', '😢', '😡', '😴'];

  const feelingStats = feelings.map((feeling) => {
    const count = entries.filter(
      (entry) => entry.feeling === feeling
    ).length;

    return {
      feeling,
      percentage: entries.length > 0
      ? Math.round((count / entries.length) * 100)
      : 0,
    };
  });

  console.log(feelingStats);
  
  if (session) {
    return (
      <SafeAreaView  style={styles.container} edges={['top']}>

        <View style={{width: '100%'}}>
          <ProfileCard/>
          <Separator color='black' size={2}/>
        </View>

        <View style={styles.entriesContainer}>
          <View>
            <MyText style={styles.text}>LAST ENTRIES</MyText>
            <EntryCard setSelectedEntry={setSelectedEntry} item={lastEntry}/>
            <EntryCard setSelectedEntry={setSelectedEntry} item={lastLastEntry}/>
          </View>

          <View style={styles.feelingsContainer}>
            <MyText style={styles.text}>FEELINGS</MyText>
            {/* <View style={styles.feelingColumn}>
            {feelingStats.map((stat) => (
              <View>
                <MyText style={[styles.feelingEmoji, {color: Colors.light.icon}]}>{stat.feeling} {stat.percentage}%</MyText>
              </View>
            ))} */}
            <View style={styles.statsContainer}>
              {feelingStats.map((stat) => (
                  <View key={stat.feeling} style={styles.statRow}>
                      <MyText style={styles.statEmoji}>{stat.feeling}</MyText>
                      <View style={styles.barBackground}>
                          <View style={[styles.barFill, { width: `${stat.percentage}%` }]} />
                      </View>
                      <Text style={styles.statPercentage}>{stat.percentage}%</Text>
                  </View>
              ))}
          </View>
            {/* </View> */}
          </View>

          <View style={{alignItems: 'center'}}>
            <Button text="+ NEW ENTRY" color={Colors.light.button} onPress={() => setModalVisible(true)}/>
          </View>

        <ModalEntry selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} onEntryDeleted={(deletedId) => setEntries((prev) => prev.filter((entry) => entry.id !== deletedId))}/>
        <ModalCreateEntry modalVisible={modalVisible} setModalVisible={setModalVisible} onEntryCreated={(newEntry) => setEntries((prev) => [newEntry, ...prev])}/>
        </View>
  
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  text: {
    fontSize: FontSize.large,
    color: Colors.light.text,
  },
  entriesContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  feelingsContainer: {
  },
  statsContainer: {
    height: 256,
    backgroundColor: Colors.light.foreground,
		justifyContent: 'space-evenly',
    padding: 12,
    borderRadius: 8,
    margin: 8,
    // gap: 4,
    ...Shadows.card,
	},
  feelingEmoji: {
		fontSize: 32,
	},
  statRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
  statEmoji: {
      fontSize: 26,
  },
  barBackground: {
      flex: 1,
      height: 12,
      backgroundColor: '#e0ddd4',
      marginHorizontal: 10
  },
  barFill: {
      height: '100%',
      backgroundColor: Colors.light.icon,
  },
  statPercentage: {
      fontSize: FontSize.medium,
      width: 36,
      textAlign: 'right',
  },
});

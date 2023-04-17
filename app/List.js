import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';
import {useEffect, useState} from "react";

export default function Template() {
  const { volume, setVolume } = useVolume();
  const [selectedValue, setSelectedValue] = useState(50);

  useEffect(() => {
    setVolume(selectedValue / 100);
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <MusicPlayer />
      <Text style={{color: 'white', fontSize: 18, margin: 5, marginLeft: 15}}>Select the desired volume</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
        {Array(100).fill(0).map((i, index) => (
          <Text
            onPress={() => setSelectedValue(index)}
            style={{
              backgroundColor: selectedValue === index ? 'magenta' : 'transparent',
              color: 'white', fontWeight: '500', borderColor: selectedValue === index ? 'magenta' : 'white', borderWidth: 1, width: 30, height: 30, margin: 5, textAlign: 'center', padding: 5
          }} key={index}>{index}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

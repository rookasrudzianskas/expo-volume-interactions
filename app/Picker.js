import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';

export default function Template() {
  const { volume, setVolume } = useVolume();
  const [selectedValue, setSelectedValue] = useState(50);

  useEffect(() => {
    setVolume(selectedValue / 100);
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <MusicPlayer />

      <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
        Select the desired volume:
      </Text>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
        itemStyle={{ color: 'white' }}
      >
        {Array(100)
          .fill(0)
          .map((_, index) => (
            <Picker.Item
              style={{ color: 'white' }}
              label={index.toString()}
              value={index}
              key={index}
            />
          ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

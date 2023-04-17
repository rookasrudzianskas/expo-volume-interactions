import {StyleSheet, Text, View, Pressable, TouchableOpacity} from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function Template() {
  const { volume, setVolume } = useVolume();
  const [digits, setDigits] = useState(Array(6).fill(0));

  useEffect(() => {
    setVolume(parseInt(digits.join(''), 2) / 64);
  }, [digits]);

  return (
    <View style={styles.container}>
      <MusicPlayer />

      <Text
        style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '500',
          marginBottom: 20,
        }}
      >
        Select the desired volume in binary:
      </Text>
      <View style={{flexDirection: 'row'}}>
        {digits.map((digit, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => {
              setDigits((cur) => {
                const update = [...cur];
                update[i] = update[i] === 0 ? 1 : 0;
                return update;
              })
            }}
            style={{
              backgroundColor: 'white',
              flex: 1,
              margin: 5,
              height: 75,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'magenta' }}>{digit}</Text>
          </TouchableOpacity>
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

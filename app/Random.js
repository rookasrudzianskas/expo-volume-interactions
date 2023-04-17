import { StyleSheet, Text, View, Button } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';

export default function Template() {
  const { volume, setVolume } = useVolume();
  return (
    <View style={styles.container}>
      <MusicPlayer />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="volume-off" size={16} color="gray" />
        <Slider
          style={{ flex: 1, marginHorizontal: 20 }}
          value={volume}
          onValueChange={() => setVolume(volume)}
          disabled
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
        />
        <FontAwesome name="volume-up" size={16} color="gray" />
      </View>

      <Button title="Feeling lucky" onPress={() => setVolume(Math.random())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

import { StyleSheet, Text, View, Alert } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';

export default function Page() {
  const { volume, setVolume } = useVolume();
  return (
    <View style={styles.container}>
      <MusicPlayer />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="volume-off" size={16} color="gray" />
        <Slider
          style={{ flex: 1, marginHorizontal: 20 }}
          value={volume}
          // onValueChange={(value) => setVolume(value)}
          onSlidingComplete={(value) =>
            Alert.alert(
              'Are you sure?',
              `Are you sure you want to change the volume to ${Math.floor(
                value * 100
              )}%`,
              [
                { text: 'Cancel' },
                { text: 'Yes, please!', onPress: () => setVolume(value) },
              ]
            )
          }
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
        />
        <FontAwesome name="volume-up" size={16} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

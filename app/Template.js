import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';

export default function Template() {
  const { volume, setVolume } = useVolume();
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';
import {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function Template() {
  const { volume, setVolume } = useVolume();
  const sensor = useAnimatedSensor(SensorType.ROTATION);

  const animatedStyle = useAnimatedStyle(() => {
    const { yaw } = sensor.sensor.value;

    console.log(yaw);
    return {};
  });

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

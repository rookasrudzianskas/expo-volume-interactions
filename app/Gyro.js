import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  useFrameCallback,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

export default function Template() {
  const { volume, setVolume } = useVolume();
  const animatedSensor = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 10,
  }); // <- initialization

  const x = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    const x = animatedSensor.sensor.value.x;
    return {
      transform: [
        {
          rotateZ: `${x * 2}deg`, //withTiming(yaw * 200 + 20, { duration: 100 }),
        },
      ],
    };
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (dt === null) {
      return;
    }
    x.value += animatedSensor.sensor.value.x * dt * 0.00001;
    x.value = Math.min(1, Math.max(0, x.value));
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      value: x.value,
    };
  });

  return (
    <View style={styles.container}>
      <MusicPlayer />

      <Animated.View
        style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      >
        <FontAwesome name="volume-off" size={16} color="gray" />
        <AnimatedSlider
          style={{ flex: 1, marginHorizontal: 20 }}
          value={x.value}
          onValueChange={() => setVolume(volume)}
          disabled
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          animatedProps={animatedProps}
        />
        <FontAwesome name="volume-up" size={16} color="gray" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

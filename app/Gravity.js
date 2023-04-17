import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from '../src/components/MusicPlayer';
import Slider from '@react-native-community/slider';
import { useVolume } from '../src/contexts/VolumeContext';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  useSharedValue,
  createAnimatedComponent,
  useAnimatedProps,
  useFrameCallback,
} from 'react-native-reanimated';

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

export default function Template() {
  const { volume, setVolume, sharedVolume } = useVolume();

  const acceleration = useSharedValue(0);

  const sensor = useAnimatedSensor(SensorType.GRAVITY);

  useFrameCallback((frameInfo) => {
    const dt = frameInfo.timeSincePreviousFrame;
    if (!dt) {
      return;
    }

    acceleration.value += sensor.sensor.value.x * dt * 0.0001;

    sharedVolume.value += acceleration.value * dt * 0.001;

    sharedVolume.value = Math.min(sharedVolume.value, 1);
    sharedVolume.value = Math.max(sharedVolume.value, 0);

    if (sharedVolume.value === 0 || sharedVolume.value === 1) {
      acceleration.value = 0;
    }
  });

  const sliderViewStyle = useAnimatedStyle(() => {
    const { x } = sensor.sensor.value;

    return {
      transform: [{ rotateZ: `${x * 2}deg` }],
    };
  });

  const sliderProps = useAnimatedProps(() => ({ value: sharedVolume.value }));

  return (
    <View style={styles.container}>
      <MusicPlayer animated={true} />

      <Animated.View
        style={[
          { flexDirection: 'row', alignItems: 'center' },
          sliderViewStyle,
        ]}
      >
        <FontAwesome name="volume-off" size={16} color="gray" />
        <AnimatedSlider
          style={{ flex: 1, marginHorizontal: 20 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          animatedProps={sliderProps}
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

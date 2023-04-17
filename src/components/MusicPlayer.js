import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import cover from '../../assets/images/song-cover.jpg';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useVolume } from '../contexts/VolumeContext';
import Slider from '@react-native-community/slider';

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const { volume } = useVolume();

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    Audio.Sound.createAsync(
      require('../../assets/sounds/RL.mp3'),
      {
        isLooping: true,
        volume,
      },
      (playbackStatus) => {
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          if (playbackStatus.error) {
            console.log(
              `Encountered a fatal error during playback: ${playbackStatus.error}`
            );
          }
          return;
        }
        // Update your UI for the loaded state
        setPlaying(playbackStatus.isPlaying);

        setDuration(playbackStatus.durationMillis);
        setPlaybackPosition(playbackStatus.positionMillis);
      }
    ).then(({ sound }) => setSound(sound));
    return () => sound && sound.unloadAsync();
  }, []);

  useEffect(() => {
    sound?.setVolumeAsync(volume);
  }, [volume]);

  const playPauseSound = async () => {
    if (playing) {
      await sound?.pauseAsync();
    } else {
      await sound?.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={cover} style={styles.image} />
        <View>
          <Text style={styles.title}>Never Gonna Give You Up</Text>
          <Text style={styles.subtitle}>Rick Astley</Text>
        </View>
      </View>

      <Slider
        style={styles.slider}
        value={playbackPosition}
        onSlidingComplete={(value) => sound?.playFromPositionAsync(value)}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
      />

      <View style={styles.controls}>
        <AntDesign name="banckward" size={35} color="white" />
        <AntDesign
          name={playing ? 'pausecircle' : 'play'}
          onPress={playPauseSound}
          size={35}
          color="white"
        />

        <AntDesign name="forward" size={35} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: 'gainsboro',
  },

  controls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  slider: {
    width: '100%',
    marginTop: 20,
  },
});

export default MusicPlayer;

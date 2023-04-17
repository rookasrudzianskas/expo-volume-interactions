import { createContext, useContext, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

const VolumeContext = createContext({
  volume: 0.5,
  setVolume: () => {},
  sharedVolume: { value: 0 },
});

export default VolumeContextProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.1);
  const sharedVolume = useSharedValue(0);
  return (
    <VolumeContext.Provider value={{ volume, setVolume, sharedVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolume = () => useContext(VolumeContext);

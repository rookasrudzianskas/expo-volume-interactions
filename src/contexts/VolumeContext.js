import { createContext, useContext, useState } from 'react';

const VolumeContext = createContext({ volume: 0.5, setVolume: () => {} });

export default VolumeContextProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.1);
  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolume = () => useContext(VolumeContext);

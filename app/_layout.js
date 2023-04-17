import { withLayoutContext } from 'expo-router';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import VolumeContext from '../src/contexts/VolumeContext';

const DrawerNavigator = createDrawerNavigator().Navigator;

export const Drawer = withLayoutContext(DrawerNavigator);

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <VolumeContext>
        <Drawer>
          <Drawer.Screen name="index" options={{ title: 'Default' }} />
        </Drawer>
      </VolumeContext>

      <StatusBar style="light" />
    </ThemeProvider>
  );
}

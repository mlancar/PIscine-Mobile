import { EntriesProvider } from '@/context/EntriesContext';
import { supabase } from '@/lib/supabase';
import * as Linking from 'expo-linking';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { useFonts, CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';
import { SplashScreen } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  useEffect(() => {
    const subscription = Linking.addEventListener('url', async ({ url }) => {
        await supabase.auth.exchangeCodeForSession(url);
        const { data } = await supabase.auth.getSession();
      });
      return () => subscription.remove();
    }, []);

    useEffect(() => {
      if (fontsLoaded) {
          SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <EntriesProvider>
        <Stack screenOptions={{ headerShown: false,contentStyle: {backgroundColor: '#ebeaea'} }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </EntriesProvider>
    </GestureHandlerRootView>

  );
}

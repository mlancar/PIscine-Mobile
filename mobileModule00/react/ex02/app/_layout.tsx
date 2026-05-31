import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SearchProvider } from '@/context/SearchContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SearchProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#2f444a' }
            }}>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SearchProvider>
  );
}
import { Stack } from 'expo-router';
import React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Movies App', // Page title
          headerRight: () => (
            // Search button in the navbar
            <TouchableOpacity onPress={() => router.push('/search')}>
              <FontAwesome
                name="search"
                size={24}
                color={Colors[colorScheme ?? 'light'].tint}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Search Movies', // Title for the search page
        }}
      />
      <Stack.Screen
        name="moviedetail"
        options={{
          title: 'Movie Detail', // Title for the movie detail page
        }}
      />
    </Stack>
  );
}

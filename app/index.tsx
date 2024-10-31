import { Redirect, useRootNavigationState } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Index({ navigation }: any) {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  return (
    <View>
      <Redirect href={'/login'} />
    </View>
    );
  }
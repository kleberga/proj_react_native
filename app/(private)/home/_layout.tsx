import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { Button } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '.';

export default function Layout(){

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Places Manager',
    });
  }, [navigation]);
    
    return(
        <Stack screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: "#ff6347"
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold"
            },
            headerRight: () => (
              <Button
                title="Add"
                onPress={() => alert('This is a button!')}
              />
            )
        }}> 
          <Stack.Screen 
              name="index"
              options={{
                headerRight: () => <Button title="tesate" onPress={() => alert('thisd is a button')} />,
              }}
              />
        </Stack>
    )
}



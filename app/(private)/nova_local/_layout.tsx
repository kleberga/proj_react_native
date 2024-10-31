/* import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';

export default function Layout(){

    const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Nova localização',
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
        }}> 
        <Stack.Screen 
            name="index">
        </Stack.Screen>
        </Stack>
    )
}
 */


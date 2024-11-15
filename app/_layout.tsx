import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#ff6347"
            },
            headerShown: true,
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold"
            }
            
        }}>
            <Stack.Screen 
            name="index" options={{
                title: "Index",
            }}>
            </Stack.Screen>
            <Stack.Screen 
            name="login" options={{
                title: "Login"
            }}>
            </Stack.Screen>
            <Stack.Screen 
            name="register" options={{
                title: "Registro"
            }}>
            </Stack.Screen>
        </Stack>
    )
}
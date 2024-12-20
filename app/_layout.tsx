import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SQLiteProvider } from "expo-sqlite";
import { DATABASE_NAME, migrateDb } from "../database/AppDatabase";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import UserProvider from "../context/userContext";

export default function Layout(){

    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Comfortaa: require("@/assets/fonts/Comfortaa-VariableFont_wght.ttf")
    })

    return(
        <UserProvider>
            <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDb}>
                <ThemeProvider value={colorScheme === "dark"? DarkTheme : DefaultTheme}>
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
                </ThemeProvider>
            </SQLiteProvider>
        </UserProvider>
       
    )
}
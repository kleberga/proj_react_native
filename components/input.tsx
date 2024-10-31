import { StyleSheet, TextInput, View, Text } from "react-native";

export default function Input({valuePlace, value, setValue, isValid, secureTextEntry}: any){

    return(
        <View>
            <TextInput 
                placeholder={valuePlace}
                value = {value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
                style={styles.input}
            />
            {
                !isValid && (
                    <Text style={styles.errorMessage}>Campo inválido</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 10,
        borderRadius: 5,
        minWidth: 300,
        maxWidth: 300,
    },
    errorMessage: {
        color:'red'
    }
});

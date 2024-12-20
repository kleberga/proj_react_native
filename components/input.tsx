import { StyleSheet, View  } from "react-native";
import { FontConstants, ColorsContants } from '@/styles/Global.style';
import { Text, TextInput } from 'react-native-paper'

export default function Input({valuePlace, value, setValue, isValid, secureTextEntry}: any){

    return(
        <View>
            <TextInput
                placeholder={valuePlace}
                value = {value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                placeholderTextColor={styles.placeHolder.color}
                textColor={FontConstants.color}
                cursorColor={FontConstants.color}
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
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        minWidth: 300,
        maxHeight: 50,
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        justifyContent: 'center'
    },
    errorMessage: {
        color: ColorsContants.errorConstantsColor
    },
    placeHolder: {
        color: FontConstants.color,
    }
});

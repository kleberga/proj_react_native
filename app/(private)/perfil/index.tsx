import { UserActionType, UserContext, UserDispatchContext } from '@/context/userContext';
import { useNavigation, router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import {  StyleSheet, View} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ColorsContants, FontConstants } from '../../../styles/Global.style';
import { Text, Button } from 'react-native-paper'

export default function Perfil(){
    
    const userAuth = useContext(UserContext)
    const navigation = useNavigation();
    const userAuthDispatch = useContext(UserDispatchContext);
    
    useEffect(() => {
        navigation.setOptions({
            title: 'Perfil',
        });
    }, [])

    function signOut(){
        userAuthDispatch({ type: UserActionType.LOGOUT, user: {email: '', token: ''} })
        router.push('/login')
    }

    return(
        <View style={styles.caixa}>
            <FontAwesome name="user" size={60} color="#ff6347" style={styles.icone} />
            <Text style={styles.titulo}>E-mail: {userAuth?.email}</Text>
            <Button onPress={signOut} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    caixa: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ColorsContants.backgroundColor,
    },
    icone: {
        padding: 20
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: FontConstants.color,
    },
    button : {
        marginTop: 20,
        backgroundColor: '#ff6347',
        borderRadius: 5,
        minWidth: 100,
        textAlign: 'center',
        maxHeight: 50
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
  });
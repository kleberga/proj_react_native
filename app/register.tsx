import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/input'
import { router } from 'expo-router';
//import env from '@/constants/env';
import env from './(private)/config';
import { ColorsContants, FontConstants } from '../styles/Global.style';
import { Text, Button } from 'react-native-paper'

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidNome, setIsValidNome] = useState(false);
  const [isValidSenha, setIsValidSenha] = useState(false);
  
  const register = async () => {
    if(username && password) {
      const apiURL = env.API_URL as string;
      const apiKEY = env.API_KEY as string;
      try{
        const response = await fetch(`${apiURL}/v1/accounts:signUp?key=${apiKEY}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password:  password,
            returnSecureToken: true,
          })
        })
        const {status, statusText} = response;
        if(status == 200) {
          const body = await response.json()
            router.push('/(private)/home');
          } else if(status == 400){
            const body = await response.json()
            Alert.alert('E-mail e/ou senha inválidos')
          } else {
            Alert.alert('Falha ao realizar registro')
          }
        } catch (error) {
          Alert.alert('Erro ao realizar registro')
        }
    }
  }

  const re = /(?=.*[A-Z])(?=.*\d)/;

  useEffect(() => {
    const validacaoNome = username.length > 4 
    const validacaoSenha = password.length > 4 && re.test(password)
    setIsValidNome(validacaoNome)
    setIsValidSenha(validacaoSenha)
  }, [username, password])

  return (
    <View style={styles.caixa}>
      <Text style={styles.titulo}>Olá, efetue o registro</Text>
      <Input 
        valuePlace='Nome do usuário...'
        value = {username}
        setValue={setUsername}
        isValid={isValidNome}
        secureTextEntry={false}
      />
      <Input 
        valuePlace='Senha...'
        value = {password}
        setValue={setPassword}
        isValid={isValidSenha}
        secureTextEntry={true}
      />
      <Button onPress={register} disabled={!(isValidNome && isValidSenha)} style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </Button>
    </View>
  )
};


const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: FontConstants.color,
  },
  caixa: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorsContants.backgroundColor,
  },
  button : {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3477eb',
    borderRadius: 5,
    minWidth: 100,
    textAlign: 'center',
    maxHeight: 50
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
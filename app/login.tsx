import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../components/input'
import { Link, router } from 'expo-router';


export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidNome, setIsValidNome] = useState(false);
  const [isValidSenha, setIsValidSenha] = useState(false);

  const login = () => {
    router.push('/(private)/home');
    setUsername('')
    setPassword('')
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
      <Text style={styles.titulo}>Olá, efetue login</Text>
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
      <Text style={styles.textoRegistro}>Ainda não possui login? <Link style={styles.linkRegistro} href="/register">Registre-se</Link></Text>
      <TouchableOpacity onPress={login} disabled={!(isValidNome && isValidSenha)} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
    </View>
  )
};


const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  caixa: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3477eb',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textoRegistro: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkRegistro: {
    color: '#3477eb',
    textDecorationLine: 'underline',
  }
});



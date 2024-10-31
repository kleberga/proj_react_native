import { StyleSheet, View} from 'react-native';
import Input from '../components/input'

export default function Localizacao({nome, setNome, validaNome, latitude, setLatitude, validaLatitude, longitude, setLongitude, validaLongitude,
    cor, setCor, validaCor
}: any) {

  return (
    <View>
      <Input 
        valuePlace='Nome da localização'
        value = {nome}
        setValue={setNome}
        isValid={validaNome}
        secureTextEntry={false}
      />
      <Input 
        valuePlace='Latitude'
        value = {latitude}
        setValue={setLatitude}
        isValid={validaLatitude}
        secureTextEntry={false}
      />
      <Input 
        valuePlace='Longitude'
        value = {longitude}
        setValue={setLongitude}
        isValid={validaLongitude}
        secureTextEntry={false}
      />
      <Input 
        valuePlace='Cor do marcador (Ex: #FF0000)'
        value = {cor}
        setValue={setCor}
        isValid={validaCor}
        secureTextEntry={false}
      />
    </View>
  )
};


/* const styles = StyleSheet.create({
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
  }
}); */
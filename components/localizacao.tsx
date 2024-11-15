import { View} from 'react-native';
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
        valuePlace='Cor do marcador em inglês (Ex: purple, red)'
        value = {cor}
        setValue={setCor}
        isValid={validaCor}
        secureTextEntry={false}
      />
    </View>
  )
};


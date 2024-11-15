import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Localizacao from '@/components/localizacao';
import { router, useNavigation } from 'expo-router';
import { HeaderBackButton } from '@react-navigation/elements';
import storage from '@/infra';

export default function NovoLocal() {

    const [nome, setNome] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [cor, setCor] = useState('purple')
    const [validaLatitude, setValidaLatitude] = useState(false);
    const [validaLongitude, setValidaLongitude] = useState(false);
    const [validaCor, setValidaCor] = useState(false);

    const navigation = useNavigation();
    
  useEffect(() => {
    navigation.setOptions({
      title: 'Nova localização',
      headerLeft: (props: any) => (
        <HeaderBackButton
            {...props}
            onPress={() => {
                router.push('/(private)/home')
            }}
        />
    )
  });
    const vLatitude = latitude.length > 0 && typeof parseFloat(latitude) === 'number' &&  Number(latitude) >= -90 && Number(latitude) <= 90
    const vLongitude = longitude.length > 0 && typeof parseFloat(longitude) === 'number' &&  Number(longitude) >= -180 && Number(longitude) <= 180
    const vCor = cor.length > 0
    setValidaLatitude(vLatitude)
    setValidaLongitude(vLongitude)
    setValidaCor(vCor)
  }, [nome, latitude, longitude, cor])

  function salvar(){
    let latitudeNumber = parseFloat(latitude as string);
    let longitudeNumber = parseFloat(longitude as string);
    storage.save({
      key: 'local',
      id: String(latitude) + '-' + String(longitude),
      data: {
        nome: nome,
        latitude: latitudeNumber,
        longitude: longitudeNumber,
        cor: cor
      }
    })
    router.push('/(private)/home');
  }
  
  return (
    <View style={styles.caixa}>
      <Localizacao 
        nome={nome} 
        setNome={setNome} 
        validaNome={true} 
        latitude={latitude} 
        setLatitude={setLatitude} 
        validaLatitude={validaLatitude} 
        longitude={longitude}
        setLongitude={setLongitude}
        validaLongitude={validaLongitude}
        cor={cor}
        setCor={setCor}
        validaCor={validaCor}
      />
      <TouchableOpacity onPress={salvar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  )
};


const styles = StyleSheet.create({
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
    backgroundColor: 'black',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
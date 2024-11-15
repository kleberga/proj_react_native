import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation} from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Localizacao from '@/components/localizacao';
import { ButtonText } from './styles';
import storage from '@/infra';


export default function ClicarMapa(){

    const navigation = useNavigation();
    const params = useLocalSearchParams();

    const [nome, setNome] = useState(params.nome);
    const [latitude, setLatitude] = useState(params.latitude);
    const [validaLatitude, setValidaLatitude] = useState(false);
    const [longitude, setLongitude] = useState(params.longitude);
    const [validaLongitude, setValidaLongitude] = useState(false);
    const [cor, setCor] = useState(params.cor);
    const [validaCor, setValidaCor] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          title: 'Editar localização',
        });
        const vLatitude = latitude.length > 0 && typeof parseFloat(latitude as string) === 'number' &&  Number(latitude) >= -90 && Number(latitude) <= 90
        const vLongitude = longitude.length > 0 && typeof parseFloat(longitude as string) === 'number' &&  Number(longitude) >= -180 && Number(longitude) <= 180
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
      if(params.rota === '/(private)/home'){
        router.replace('/(private)/home')
      }
      if(params.rota === '/(private)/lista_locais'){
        router.replace('/(private)/lista_locais')
      }
    }

    function deletar(){
      storage.remove({
        key: 'local',
        id: String(latitude) + '-' + String(longitude)
      })
      if(params.rota === '/(private)/home'){
        router.replace('/(private)/home')
      }
      if(params.rota === '/(private)/lista_locais'){
        router.replace('/(private)/lista_locais')
      }
    }


    return(
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
            <TouchableOpacity onPress={salvar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button1}>
                <ButtonText>Salvar</ButtonText>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button2}>
                <ButtonText>Remover</ButtonText>
            </TouchableOpacity>
        </View>
    )
}


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
    button1 : {
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
    },
    button2 : {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#ff6347',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 300,
      textAlign: 'center',
    },
  });


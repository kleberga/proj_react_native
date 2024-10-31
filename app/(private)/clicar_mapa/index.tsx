import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation} from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Localizacao from '@/components/localizacao';

export default function ClicarMapa(){

    const navigation = useNavigation();

    const params = useLocalSearchParams();

    const [nome, setNome] = useState('');
    const [validaNome, setValidaNome] = useState(false);
    const [latitude, setLatitude] = useState(params.latitude);
    const [validaLatitude, setValidaLatitude] = useState(false);
    const [longitude, setLongitude] = useState(params.longitude);
    const [validaLongitude, setValidaLongitude] = useState(false);
    const [cor, setCor] = useState('#FF0000');
    const [validaCor, setValidaCor] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          title: 'Editar localização',
        });
        const vNome = nome.length > 4 
        const vLatitude = latitude.length > 0 && typeof parseFloat(latitude[0]) === 'number' &&  Number(latitude) >= -90 && Number(latitude) <= 90
        const vLongitude = longitude.length > 0 && typeof parseFloat(longitude[0]) === 'number' &&  Number(longitude) >= -180 && Number(longitude) <= 180
        const vCor = cor.length > 0 && /^#[0-9A-F]{6}$/i.test(cor)
        setValidaNome(vNome)
        setValidaLatitude(vLatitude)
        setValidaLongitude(vLongitude)
        setValidaCor(vCor)
      }, [nome, latitude, longitude, cor])

    return(
        <View style={styles.caixa}>
            <Localizacao
                nome={nome}
                setNome={setNome}
                validaNome={validaNome}
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
            <TouchableOpacity onPress={() => {}} disabled={!(validaNome && validaLatitude && validaLongitude && validaCor)} style={styles.button1}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} disabled={!(validaNome && validaLatitude && validaLongitude && validaCor)} style={styles.button2}>
                <Text style={styles.buttonText}>Remover</Text>
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
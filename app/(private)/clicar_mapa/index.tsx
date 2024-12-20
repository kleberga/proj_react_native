import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation} from "expo-router";
import { StyleSheet, View } from "react-native";
import Localizacao from '../../../components/localizacao';
import { useSQLiteContext } from 'expo-sqlite';
import { ColorsContants } from '../../../styles/Global.style';
import { Button, Text } from 'react-native-paper'

export default function ClicarMapa(){

    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [nome, setNome] = useState(String(params.nome));
    const [latitude, setLatitude] = useState(params.latitude);
    const [validaLatitude, setValidaLatitude] = useState(false);
    const [longitude, setLongitude] = useState(params.longitude);
    const [validaLongitude, setValidaLongitude] = useState(false);
    const [cor, setCor] = useState(String(params.cor));
    const [validaCor, setValidaCor] = useState(false);
    const [id, setId] = useState(String(params.id));

    const db = useSQLiteContext();

    useEffect(() => {
        navigation.setOptions({
          title: 'Editar localização',
        });
        const vLatitude = latitude!.length > 0 && typeof parseFloat(latitude as string) === 'number' &&  Number(latitude) >= -90 && Number(latitude) <= 90
        const vLongitude = longitude!.length > 0 && typeof parseFloat(longitude as string) === 'number' &&  Number(longitude) >= -180 && Number(longitude) <= 180
        const vCor = cor.length > 0 
        setValidaLatitude(vLatitude)
        setValidaLongitude(vLongitude)
        setValidaCor(vCor)
      }, [nome, latitude, longitude, cor])

      function alterar(){
        let latitudeNumber = parseFloat(latitude as string);
        let longitudeNumber = parseFloat(longitude as string);
        db.runAsync(`UPDATE places SET nome=?, latitude=?, longitude=?, cor=? where id=?`, [nome, latitudeNumber, longitudeNumber, cor, id])
        if(params.rota === '/(private)/home'){
          router.replace('/(private)/home')
        }
        if(params.rota === '/(private)/lista_locais'){
          router.replace('/(private)/lista_locais')
        }
      }

      function deletar(){
        db.runAsync(`DELETE FROM places WHERE id = '${id}'`)
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
            <Button onPress={alterar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button1}  mode='contained'>
                <Text style={styles.buttonText} variant="titleSmall">Salvar</Text>
            </Button>
            <Button onPress={deletar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button2} mode='contained'>
                <Text style={styles.buttonText} variant="titleSmall">Remover</Text>
            </Button>
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
      backgroundColor: ColorsContants.backgroundColor
    },
    button1 : {
      marginTop: 20,
      padding: 0,
      backgroundColor: 'black',
      borderRadius: 10,
      minWidth: 300,
      textAlign: 'center',
      maxHeight: 55
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    button2 : {
      marginTop: 20,
      padding: 0,
      backgroundColor: '#ff6347',
      borderRadius: 10,
      minWidth: 300,
      textAlign: 'center',
      maxHeight: 55
    },
  });


import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation} from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import Localizacao from '../../../components/localizacao';
import { useSQLiteContext } from 'expo-sqlite';
import { ColorsContants } from '../../../styles/Global.style';
//import env from '@/constants/env';
import env from '../config';
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

      async function alterar(){
        const locals = env.API_GQ_URL as string
        const variables = { atracoes: { id: parseFloat(id), nome: nome, latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string), cor: cor }};
          try{
              const response = await fetch(locals, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: `mutation UpdateAtracao($atracoes: updateAtracaoInput!) {
                              updateAtracao(Atracoes: $atracoes) {
                                id
                                nome
                                latitude
                                longitude
                                cor
                              }
                          }`,
                  variables: variables
                  })
                })
                const result = await response.json(); 
                if (result.errors) { 
                  throw new Error(result.errors[0].message); 
                }
              } catch (error) {
                  const err = error as { message: string}
                  Alert.alert(err.message)
        }
        if(params.rota === '/(private)/lista_locais_gq'){
          router.replace('/(private)/lista_locais_gq')
        }
      }

      async function deletar(){
        const locals = env.API_GQ_URL as string
        const variables = { deleteAtracaoId: id};
          try{
              const response = await fetch(locals, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: `mutation Mutation($deleteAtracaoId: String) {
                            deleteAtracao(id: $deleteAtracaoId)
                          }`,
                  variables: variables
                  })
                })
                const result = await response.json(); 
                if (result.errors) { 
                  throw new Error(result.errors[0].message); 
                }
              } catch (error) {
                  const err = error as { message: string}
                  Alert.alert(err.message)
        }
        if(params.rota === '/(private)/lista_locais_gq'){
          router.replace('/(private)/lista_locais_gq')
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
            <Button onPress={alterar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button1}>
                <Text style={styles.buttonText}>Salvar</Text>
            </Button>
            <Button onPress={deletar} disabled={!(validaLatitude && validaLongitude && validaCor)} style={styles.button2}>
                <Text style={styles.buttonText}>Remover</Text>
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
      backgroundColor: 'black',
      borderRadius: 10,
      minWidth: 300,
      textAlign: 'center',
      maxHeight: 50,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    button2 : {
      marginTop: 20,
      backgroundColor: '#ff6347',
      borderRadius: 10,
      minWidth: 300,
      textAlign: 'center',
      maxHeight: 50,
    },
  });


import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { ListaLocais_gq } from '../../../components/lista';
import { useSQLiteContext } from 'expo-sqlite';
import { ColorsContants } from '../../../styles/Global.style';
//import env from '@/constants/env';
import env from '../config';
import { FAB } from 'react-native-paper'


type ItemData = {
    nome: string;
    latitude: number;
    longitude: number;
    cor: string;
};
  
export default function ListaSeparada_gq(){

    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState<string>();
    const [lista, setLista] = useState([] as ItemData[])

    const db = useSQLiteContext();

    async function recuperarLista(){
        const locals = env.API_GQ_URL as string
        try{
            const response = await fetch(locals, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query { 
                            atracoes {
                                id, 
                                nome, 
                                latitude, 
                                longitude, 
                                cor
                            }
                        }`,
                })
            })
            const { data } = await response.json();
            setLista(data.atracoes);
        } catch (error) {
            const err = error as { message: string}
            Alert.alert(err.message)
        }
    }

     useEffect(() => {
        navigation.setOptions({
            title: 'Sugestões de locais',
            headerLeft: (props: any) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        router.push('/(private)/lista_locais')
                    }}/>
            )
          });
        recuperarLista()
     },[])
     return(
        <>
            <ListaLocais_gq lista={lista} selectedId={selectedId}/>
            <View style={styles.view1}  pointerEvents='box-none'>
                <FAB
                    icon="plus"
                    color="white"
                    style={styles.fab}
                    onPress={() => {
                        router.push('/(private)/nova_local_gq');
                    }}/>
            </View>
        </>
            
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
    view1: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
   },
   fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#036bfc',
},
  });
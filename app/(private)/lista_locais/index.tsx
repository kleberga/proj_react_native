import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { ListaLocais} from '../../../components/lista';
import { useSQLiteContext } from 'expo-sqlite';
import { Text, Button } from 'react-native-paper'
import { ColorsContants } from '../../../styles/Global.style';

type ItemData = {
    nome: string;
    latitude: number;
    longitude: number;
    cor: string;
};
  
export default function ListaSeparada(){

    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState<string>();
    const [lista, setLista] = useState([] as ItemData[])

    const db = useSQLiteContext();

    async function recuperarLista(){
        const locals = await db.getAllAsync<ItemData>(`SELECT * FROM places`)
        setLista(locals);
    }

     useEffect(() => {
        navigation.setOptions({
            title: 'Todas as localizações',
            headerLeft: (props: any) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        router.push('/(private)/home')
                    }}/>
            )
          });
        recuperarLista()
     },[])
     return(
        <>
            <View style={styles.caixa}>
                <Button onPress={() => { router.push('/(private)/lista_locais_gq')}}  style={styles.button}>
                    <Text style={styles.buttonText}>Sugestões de locais</Text>
                </Button>
            </View>
            <ListaLocais lista={lista} selectedId={selectedId}/>
        </>
     )
}

const styles = StyleSheet.create({
    button : {
      marginTop: 20,
      backgroundColor: 'black',
      borderRadius: 10,
      minWidth: 300,
      maxWidth: 300,
      maxHeight: 50,
      textAlign: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    caixa : {
        alignItems: 'center',
        backgroundColor: ColorsContants.backgroundColor
    }
  });
import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import storage from '@/infra';
import { HeaderBackButton } from '@react-navigation/elements';
import ListaLocais from '@/components/lista';

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

     useEffect(() => {
        navigation.setOptions({
            title: 'Todas as localizações',
            headerLeft: (props: any) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        router.push('/(private)/home')
                    }}
                />
            )
          });
          storage.getAllDataForKey('local').then(locals => {
            setLista(locals)
        });
     },[])

     return(
        <ListaLocais lista={lista} selectedId={selectedId}/>
     )
}



const styles = StyleSheet.create({
    seperator: {
        height: 1,
        backgroundColor: "black",
        marginVertical: 10,
        width: "90%",
        alignSelf: "center"
    },
    textoNome: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        marginBottom: 5
    },
    textoCoord: {
        fontSize: 16,
        paddingLeft: 10,
    },
    view: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    icone: {
        marginTop: 12,
    }
});
import { FlatList, View, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { ColorsContants, FontConstants } from '../styles/Global.style';
import { Text } from 'react-native-paper'

type ItemData = {
    id: number,
    nome: string;
    latitude: number;
    longitude: number;
    cor: string;
};
  
type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} >
        <View style={styles.view}>
            <View >
                <Entypo style={styles.icone} name="location-pin" size={50} color={item.cor} />
            </View>
            <View >
                <Text style={styles.textoNome}>{item.nome}</Text>
                <Text style={styles.textoCoord}>Lat.: {Math.round(item.latitude*1000)/1000}  Long.: {Math.round(item.longitude*1000)/1000}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

function ListaDeLocais({dados, renderItem}: any){
    return(
        <SafeAreaProvider style={styles.backColor}>
            <SafeAreaView>
            <FlatList
                ItemSeparatorComponent={() => {
                    return <View style={styles.seperator}/>;
                }}
                pointerEvents='auto'
                data={dados}
                keyExtractor={item => String(item.id)}
                renderItem={renderItem}
            />
            </SafeAreaView>
        </SafeAreaProvider>
     )
}

export function ListaLocais({lista, selectedId}: any){
     const renderItem = ({item}: {item: ItemData}) => {
        const backgroundColor = item.nome === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.nome === selectedId ? 'white' : 'black';
        return (
        <Item
            item={item}
            onPress={() => {
                router.push({pathname: '/(private)/clicar_mapa',
                    params: {id: item.id, nome: item.nome, latitude: item.latitude, longitude: item.longitude, cor: item.cor, rota: '/(private)/lista_locais'}})
            }}
            backgroundColor={backgroundColor}
            textColor={color}
          />
        );
      };
      
     return(
        <ListaDeLocais dados={lista} renderItem={renderItem}/>
     )
}

export function ListaLocais_gq({lista, selectedId}: any){
    const renderItem = ({item}: {item: ItemData}) => {
       const backgroundColor = item.nome === selectedId ? '#6e3b6e' : '#f9c2ff';
       const color = item.nome === selectedId ? 'white' : 'black';
       return (
       <Item
           item={item}
           onPress={() => {
               router.push({pathname: '/(private)/locais_gq',
                   params: {id: item.id, nome: item.nome, latitude: item.latitude, longitude: item.longitude, cor: item.cor, rota: '/(private)/lista_locais_gq'}})
           }}
           backgroundColor={backgroundColor}
           textColor={color}
         />
       );
     };
     
    return(
       <ListaDeLocais dados={lista} renderItem={renderItem}/>
    )
}

const styles = StyleSheet.create({
    seperator: {
        height: 1,
        backgroundColor: FontConstants.color,
        marginVertical: 10,
        width: "90%",
        alignSelf: "center"
    },
    textoNome: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        marginBottom: 5,
        color: FontConstants.color
    },
    textoCoord: {
        fontSize: 16,
        paddingLeft: 10,
        color: FontConstants.color
    },
    view: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    icone: {
        marginTop: 12,
    },
    backColor: {
        backgroundColor: ColorsContants.backgroundColor,
    }
});



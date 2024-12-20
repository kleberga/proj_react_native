import { Dimensions, View} from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import * as Location from 'expo-location';
import {ListaLocais} from '../../../components/lista';
import { useSQLiteContext } from 'expo-sqlite';
import { FAB } from 'react-native-paper'

type ItemData = {
    latitude: number;
    longitude: number;
  };

export default function Home(){

    const [marker, setMarker] = useState([] as LatLng[])
    const navigation = useNavigation();
    const [locacao, setLocacao] = useState({latitude: -22.951804, longitude: -43.210760} as ItemData);
    const [region, setRegion] = useState({ latitude: locacao.latitude, longitude: locacao.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421, });
    const [errorMsg, setErrorMsg] = useState('');
    const {height,width} = Dimensions.get("window")
    const [isTablet, setIsTablet] = useState(width > height)
    const [lista, setLista] = useState([] as ItemData[])
    const [selectedId, setSelectedId] = useState<string>();

    const db = useSQLiteContext()

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permissão para acesso à localização negada');
            return;
          }
          let location = (await Location.getCurrentPositionAsync({})).coords;
          setLocacao({latitude: location.latitude, longitude: location.longitude})
          setRegion({ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}); 
        })();
    }, []);

    //const region = { latitude: locacao.latitude, longitude: locacao.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }

    useEffect(() => {
        navigation.setOptions({
            title: 'Places Manager',
        });
        if(!isTablet){
             navigation.setOptions({
                headerRight: () => (
                    <>
                    <IconButton 
                        size={30}
                        icon="view-list"
                        onPress={() => router.push('/lista_locais')}
                        iconColor="#fff"
                    />
                     <IconButton 
                        size={30}
                        icon="account"
                        onPress={() => router.push('/perfil')}
                        iconColor="#fff"
                    />
                    </>
                ),
            }); 
        } else {
            navigation.setOptions({
                headerRight: () => (
                     <IconButton 
                        size={30}
                        icon="account"
                        onPress={() => router.push('/perfil')}
                        iconColor="#fff"
                    />
                ),
            }); 
        }
        db.getAllAsync<ItemData>(`SELECT * FROM places`).then(data => {
            setMarker(data)
        })
    }, [])

    useEffect(() => {
        db.getAllAsync<ItemData>(`SELECT * FROM places`).then(data => {
            setLista(data)
        })
     },[marker])

    return (
        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
            <MapView style={styles.mapStyle}
                cacheEnabled={false}
                region={region} 
                showsUserLocation={true}
                onPress={(e) => {
                      let latitudeNumber = e.nativeEvent.coordinate.latitude;
                      let longitudeNumber = e.nativeEvent.coordinate.longitude;
                      db.runAsync(`INSERT INTO places (
                        nome,
                        latitude,
                        longitude,
                        cor
                      ) VALUES (?,?,?,?)`,['', latitudeNumber, longitudeNumber, 'purple']);
                    db.getAllAsync<ItemData>(`SELECT * FROM places`).then(data => {
                        setMarker(data)
                    })
                    }}>
                    {
                    marker.map((marker: any, index: any) => {
                        return (
                            <View  key={index}>
                                <Marker 
                                    coordinate={{latitude: marker.latitude, longitude: marker.longitude}} 
                                    key={index} 
                                    pinColor={marker.cor}
                                    title={marker.nome}
                                    onPress={() => {
                                        router.push({pathname: '/(private)/clicar_mapa',
                                            params: {id: marker.id, nome: marker.nome, latitude: marker.latitude, longitude: marker.longitude, cor: marker.cor, rota: '/(private)/home'}});
                                    }}
                                />
                            </View>
                        )})
                    }
            </MapView>
            {isTablet && <ListaLocais lista={lista} selectedId={selectedId}/>}
            <View style={styles.view1}  pointerEvents='box-none'>
                <FAB
                    icon="plus"
                    color="white"
                    style={styles.fab}
                    onPress={() => {
                         router.push('/(private)/nova_local');
                    }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
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



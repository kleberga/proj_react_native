import { Dimensions, View} from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { FloatingAction } from "react-native-floating-action";
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import storage from '@/infra';
import * as Location from 'expo-location';
import ListaLocais from '@/components/lista';

type ItemData = {
    latitude: number;
    longitude: number;
  };

export default function Home(){

    const [marker, setMarker] = useState([] as LatLng[])
    const navigation = useNavigation();
    const [location, setLocation] = useState({} as ItemData);
    const [errorMsg, setErrorMsg] = useState('');
    const {height,width} = Dimensions.get("window")
    const [isTablet, setIsTablet] = useState(width > height)
    const [lista, setLista] = useState([] as ItemData[])
    const [selectedId, setSelectedId] = useState<string>();

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permissão para acesso à localização negada');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude})
        })();
      }, []);

      const region = { latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }

    useEffect(() => {
        navigation.setOptions({
            title: 'Places Manager',
        });
        if(!isTablet){
            navigation.setOptions({
                headerRight: () => (
                    <IconButton 
                        size={30}
                        icon="view-list"
                        onPress={() => router.push('/lista_locais')}
                        iconColor="#fff"
                    />),
            });
        }
        storage.getAllDataForKey('local').then(locals => {
            setMarker(locals)
        });
    }, [])

    useEffect(() => {
          storage.getAllDataForKey('local').then(locals => {
            setLista(locals)
        });
     },[marker])


    return (
        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
            <MapView style={styles.mapStyle} 
                region={region} 
                showsUserLocation={true}
                onPress={(e) => {
                    storage.save({
                        key: 'local', 
                        id:  String(e.nativeEvent.coordinate.latitude) + "-" + String(e.nativeEvent.coordinate.longitude),
                        data: {
                            nome: '',
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                            cor: 'purple',
                        },
                      });
                      storage.getAllDataForKey('local').then(locals => {
                        setMarker(locals)
                    });
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
                                            params: {nome: marker.nome, latitude: marker.latitude, longitude: marker.longitude, cor: marker.cor, rota: '/(private)/home'}});
                                    }}
                                />
                            </View>
                        )})
                    }
            </MapView>
            {isTablet && <ListaLocais lista={lista} selectedId={selectedId}/>}
            <View style={styles.view}  pointerEvents='box-none'>
                <FloatingAction
                    onPressMain={() => {
                        router.push('/(private)/nova_local');
                     }}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
        //...StyleSheet.absoluteFillObject,
        },
    view: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
   }
});
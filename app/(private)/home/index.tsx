import { View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { FloatingAction } from "react-native-floating-action";
import { router, useNavigation } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from "react-native";

        export default function Home(){

            const region = { latitude: -15.879449285084364, longitude: -48.01702557034603, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
            const [marker, setMarker] = useState([{latitude: 0, longitude: 0}] as LatLng[])
            const navigation = useNavigation();

            return (
                <View style={{ flex: 1 }}>
                    <MapView style={{ flex: 1 }} 
                        region={region} 
                        showsUserLocation={true}
                        onPress={(e) => {
                            let newArray: LatLng[] = [...marker, e.nativeEvent.coordinate]
                            setMarker(newArray)
                            // console.log(marker)
                        }}>
                        {
                        marker.map((marker: any, index: any) => {
                            return (
                                <Marker 
                                coordinate={{latitude: marker.latitude, longitude: marker.longitude}} 
                                key={index} 
                                pinColor="purple"
                                title=""
                                onPress={() => {
                                    router.push({pathname: '/(private)/clicar_mapa', params: {latitude: marker.latitude, longitude: marker.longitude}});
                                }}
                                />
                            )})
                        }
                    </MapView>
                    <View>
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
                ...StyleSheet.absoluteFillObject
                },
          });
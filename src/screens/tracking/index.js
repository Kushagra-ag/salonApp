import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    Image,
    PermissionsAndroid
} from 'react-native';
import { Container, Button } from 'native-base';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import stylesCtm from '../../styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
let { width, height } = Dimensions.get('window');

Geocoder.init('AIzaSyBov-hgk72VmzPEXpUtzZHvvzFwf7rqhco');

function tracking({ navigation }) {
    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.00438,
        longitudeDelta: 0.002
    });

    const [err, setErr] = useState('');
    const [flag, setFlag] = useState(0);
    const [address, setAddress] = useState('                     ');

    async function locPerm() {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            console.log('not granted');
            Alert.alert(
                'Permission needed',
                'E-beauty needs your device location in order to schedule the beautician',
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            console.log('Ok Pressed');
                            // navigation.goBack();
                            setErr(
                                'Location permission not granted. Please go back and try again.'
                            );
                        }
                    }
                ]
            );
        } else if (status === 'granted') {
            console.log('granted');

            // console.log('checking if service enabled');
            // const enabled = await Location.hasServicesEnabledAsync();
            // console.log(enabled)

            try {
                setErr('Please wait...');
                const loc = await Location.getCurrentPositionAsync();
                // console.log('loc - - - ', loc);

                await setPosition({
                    ...position,
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    plusCode: loc.plus_code, //undefined
                    placeId: loc.place_id //undefined
                });
                setFlag(1);
            } catch (e) {
                console.log(e);
                setErr(
                    'We could not fetch your location, make sure you have location services enabled on your device and try again.'
                );
            }
        }
    }

    const pinDragEnd = region => {
        console.log('in regioncomplete', region);

        setPosition({
            ...position,
            ...region
        });

        Geocoder.from(region.latitude, region.longitude)
            .then(json => {
                console.log(json);
                const address = json.results[0].formatted_address;
                setAddress(address);
                setPosition({
                    ...position,
                    plusCode: json.plus_code,
                    placeId: json.place_id
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    // async function locPerm2(next) {
    // 	try {
    // 		const {granted} = await PermissionsAndroid.request(
    // 			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    // 			{
    // 				title: 'Location Permission',
    // 				message: 'This app needs access to your location ',
    // 				buttonNeutral: 'Ask Me Later',
    // 				buttonNegative: 'Cancel',
    // 				buttonPositive: 'OK'
    // 			}
    // 		);
    // 		console.log(granted);
    // 		if (granted) {
    // 			console.log('You can use the location');
    // 			// console.log(Geolocation.getCurrentPosition.toString());
    // 			// setFlag(1);
    // 			next();
    // 		} else {
    // 			console.log('Camera permission denied');
    // 		}
    // 	} catch (err) {
    // 		console.log('err', err);
    // 	}
    // }

    useFocusEffect(
        React.useCallback(() => {
            locPerm();

            return () => {
                console.log('return from tracking');
            };
        }, [])
    );

    return flag ? (
        <Container>
            <View style={styles.container}>
                <MapView
                    style={styles.mapContainer}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={false}
                    // followUserLocation
                    // region={position}
                    zoomEnabled={true}
                    showsMyLocationButton
                    initialRegion={position}
                    // onRegionChange={(e)=>pinDragEnd(e)}
                    onRegionChangeComplete={region => pinDragEnd(region)}
                    // onPanDragComplete={region => pinDragEnd(region)}
                    loadingEnabled={true}
                    toolbarEnabled={true}
                    // onPress={e => pinDragEnd(e)}
                >
                    {
                        // <Marker
                        // 				coordinate={{
                        // 					latitude: position.latitude,
                        // 					longitude: position.longitude
                        // 				}}
                        // 				title={'Your Location'}
                        // 				// draggable
                        // 				// onDragEnd={(e)=>pinDragEnd(e)}
                        // 			/>
                    }
                </MapView>
                <Image
                    style={stylesCtm.mapMarkerPin}
                    source={require('../../../assets/app/pin.png')}
                />
            </View>
            <View style={stylesCtm.mapsTopPanel}>
                <Text style={stylesCtm.mapsTopPanelText}>
                    Select your location
                </Text>
            </View>
            <View style={stylesCtm.mapsBottomPanel}>
                <Text
                    style={styles.address}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {address}
                </Text>

                <Button dark block style={styles.localBtn}>
                    <Text style={stylesCtm.buttonText}>Confirm location</Text>
                </Button>
            </View>
        </Container>
    ) : (
        <View style={styles.err}>
            <MaterialIcons
                name="location-off"
                size={200}
                color="#607d8b44"
                style={{ paddingBottom: 30 }}
            />
            <Text style={styles.errBox}>{err}</Text>
            <Button
                dark
                block
                style={{ marginHorizontal: 40, marginVertical: 40 }}
                onPress={
                    () => navigation.goBack()
                    // navigation.navigate("Stripe", {
                    //     price: amt,
                    // })
                }
            >
                <Text style={stylesCtm.buttonText}>Back to cart</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapContainer: {
        position: 'absolute',
        width: '100%',
        height: height
    },
    address: {
        fontSize: 15,
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 5,
        paddingVertical: 20,
        borderWidth: 0
    },
    err: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    errBox: {
        backgroundColor: '#607d8b11',
        color: '#607d8b',
        paddingHorizontal: 10,
        paddingVertical: 20,
        textAlign: 'center'
    },
    permDenied: {
        flex: 1
    },

    localBtn: {
        marginTop: 10
    }
});

export default tracking;

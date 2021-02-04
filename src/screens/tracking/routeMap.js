import React, { useEffect, useState } from 'react';
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
import {
	Container,
	Header,
	Left,
	Body,
	Title,
	Right,
	Icon,
	Button
} from 'native-base';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import stylesCtm from '../../styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import { placeOrder, orderStatus } from '../../methods/miscMethods.js';
import { getCart } from '../../methods/cartMethods.js';
let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function routeMap({ navigation, route }) {
	const [position, setPosition] = useState({
		customer: {
			latitude: route.params.locations[0].latitude,
			longitude: route.params.locations[0].longitude,
		},
		beautician: {
			latitude: route.params.locations[1].latitude,
			longitude: route.params.locations[1].longitude,
		}
	});

	const [beauticianPosition, setBeauticianPosition] = useState(
		route.params.locations[1]
	);

	const [err, setErr] = useState('');
	const [flag, setFlag] = useState(0);
	const [waypoint, setWaypoint] = useState({
		time: null,
		distance: null
	});
	const [order, setOrder] = useState(null);

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

			setFlag(1);
		}
	}


	const confirmOrder = async () => {
		const cart = await getCart();
		console.log('cart', cart);

		const data = {
			customerLocation: `[${position.customer.latitude}, ${position.customer.longitude}]`,
			cart: {
				products: cart,
				totalPrice: route.params.price
			}
		};
		console.log('b4 func');
		await placeOrder(data, async function (response) {
			console.log('after func');

			// await setOrder(response);

			console.log('from placorder - default - ', response.order._id);

			// navigation.navigate('WaitScreen', {
			// 	orderId: response.order._id
			// });
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			locPerm();

			let interval = setInterval(function () {
				console.log('in routemap interval', route.params.orderId);

				orderStatus({ orderId: route.params.orderId }, function (res) {
					console.log('ress', res);

					if (
						res.orderStatus === 'beauticianReachedDestination' ||
						1
					) {
						console.log('reached');
						clearInterval(interval);
						// setStatus("accepted");
						// navigation.navigate('RouteMap', {
						// 		orderId: route.params.prderId,
						// 		locations: [{latitude: route.params.position.latitude, longitude: route.params.position.longitude}, { latitude: 28.7041, longitude: 77.1025}]

						// })
						return;
					}

					let loc = JSON.parse(res.sellerLocation);
					setPosition({
						...position,
						beautician: {
							latitude: res.sellerLocation[0],
							longitude: res.sellerLocation[1]
						}
					}
					);
				});
			}, 2000);

			return () => {
				clearInterval(interval);
				console.log('return from routemap');
			};
		}, [])
	);

	return flag ? (
		<React.Fragment>
			<View style={styles.container}>
				<MapView
					style={stylesCtm.mapContainer}
					provider={PROVIDER_GOOGLE}
					showsUserLocation={false}
					zoomEnabled={true}
					initialRegion={{...position.customer, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
					loadingEnabled={true}
					toolbarEnabled={true}
				>
					<Marker
						coordinate={position.customer}
						title='Your Location'
						// description="hg"
					>
						<Image source={require('../../../assets/app/pin.png')} resizeMode="center" style={stylesCtm.mapMarkerPin} />
					</Marker>

					<Marker
						coordinate={position.beautician}
						title='Beautician'
					>
						<Image source={require('../../../assets/app/pin.png')} resizeMode="center" style={stylesCtm.mapMarkerPin} />
					</Marker>

					<MapViewDirections
						origin={route.params.locations[1]}
						destination={route.params.locations[0]}
						// origin="26.9124,75.7873"
						// destination="28.7041,77.1025"
						apikey={'AIzaSyBov-hgk72VmzPEXpUtzZHvvzFwf7rqhco'}
						strokeWidth={3}
						strokeColor="#000"
						onReady={result => {
							console.log(result);
							setWaypoint({
								time: result.duration,
								distance: result.distance
							})
						}}
					/>
				</MapView>
			</View>
			<View style={stylesCtm.mapsTopPanel}>
				<Button transparent onPress={() => navigation.goBack()}>
					<Icon
						name="arrow-back"
						style={{ fontSize: 24, color: '#000' }}
					/>
				</Button>

				<Text style={stylesCtm.mapsTopPanelText}>
					Track your beautician
				</Text>
			</View>
			<View style={stylesCtm.mapsBottomPanel}>
				
				<View style={styles.mapsBottomPanel}>
					<Image
						style={styles.img}
						source={require('../../../assets/app/default.png')}
					/>

					<Text
						style={styles.info}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						Jane Doe
					</Text>
					<View style={styles.ratingView}>
						<Text style={styles.ratingViewTxt}>4.5</Text>
						<MaterialIcons name="star" size={24} color="black" />
					</View>
				</View>
				<View>
					<Text style={styles.time}>
						Estimated time - About {Math.round(waypoint.time)} minutes
					</Text>
				</View>

				<Button
					dark
					block
					onPress={
						() => null
						// navigation.navigate('Stripe', {
						// 	price: route.params.price
						// })
					}
					style={styles.localBtn}
				>
					<Text style={stylesCtm.buttonText}>
						Call Service Provider
					</Text>
				</Button>
			</View>
		</React.Fragment>
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
				onPress={() => navigation.navigate('Cart')}
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
	info: {
		fontSize: 18,
		// backgroundColor: '#ddd',
		// borderRadius: 5,
		padding: 5,
		paddingVertical: 20,
		borderWidth: 0
	},
	ratingView: {
		marginLeft: 'auto',
		flexDirection: 'row',
		alignItems: 'center'
	},
	ratingViewTxt: {
		paddingHorizontal: 5,
		fontSize: 16
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
	time: {
		fontSize: 15,
		// backgroundColor: '#ddd',
		borderRadius: 5,
		padding: 5,
		paddingVertical: 20,
		borderWidth: 0
	},
	mapsBottomPanel: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	img: {
		height: 55,
		width: 55,
		marginRight: 10,
		backgroundColor: '#ccc',
		borderRadius: 10
	},
	permDenied: {
		flex: 1
	},

	localBtn: {
		marginTop: 10
	}
});

import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import StripePayment from '../../stripe/default.js';
import { orderStatus } from '../../methods/miscMethods.js';
import stylesCtm from '../../styles';

export default function WaitScreen({ navigation, route }) {
	const [status, setStatus] = useState('waiting');
	const [loc, setLoc] = useState({});

	useEffect(() => {
		console.log('in waitscreen');
		const orderCreated = route.params.orderCreated;
		const timeout = route.params.timeout;

		let interval = setInterval(function () {
			console.log('in interval', route.params.orderId);

			orderStatus({ orderId: route.params.orderId }, function (res) {
				console.log('ress', res);

				if (timeout && Date.now() - orderCreated > timeout) {
					setStatus('timeout');
					clearInterval(interval);
					return;
				}

				if (res.orderStatus === 'accepted' || 1) {

					// setLoc({
					// 	latitude: res.seller[0] || 26.9124,
					// 	longitude: res.seller[1] || 75.7873
					// })
					setLoc({
						latitude: 26.9124,
						longitude: 75.7873
					})
					console.log('accepted');
					clearInterval(interval);
					setStatus('accepted');
				}
			});
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const trackingScreen = () => {
		console.log('in trackingScreen func', loc);
		navigation.navigate('RouteMap', {
								orderId: route.params.orderId,
								locations: [
									{
										latitude:
											route.params.position.latitude,
										longitude:
											route.params.position.longitude
									},
									{
										latitude: loc.latitude,
										longitude: loc.longitude
									}
								]
							})
	}

	return (
		<React.Fragment>
			{status === 'timeout' && (
				<View style={styles.container}>
					<Text style={{ marginHorizontal: 20 }}>
						Your request timed out :(
					</Text>
				</View>
			)}
			{status === 'waiting' && (
				<View style={styles.container}>
					<MaterialIcons
						name="location-searching"
						size={200}
						color="#607d8b44"
						style={{ paddingBottom: 30 }}
					/>
					<Text>Searching for service providers nearby...</Text>
					<ActivityIndicator />
				</View>
			)}
			{status === 'accepted' && (
				<View style={styles.container}>
					<MaterialCommunityIcons
						name="clipboard-check-outline"
						size={200}
						color="#607d8b44"
						style={{ paddingBottom: 30 }}
					/>
					<Text>Someone accepted your request!</Text>
					<Button
						dark
						block
						style={{ marginHorizontal: 40, marginVertical: 40 }}
						onPress={() =>
							setStatus("paymentGateway")
							// navigation.navigate('RouteMap', {
							// 	orderId: route.params.orderId,
							// 	locations: [
							// 		{
							// 			latitude:
							// 				route.params.position.latitude,
							// 			longitude:
							// 				route.params.position.longitude
							// 		},
							// 		{
							// 			latitude: res.seller[0],
							// 			longitude: res.seller[1]
							// 		}
							// 	]
							// })
						}
					>
						<Text style={stylesCtm.buttonText}>Proceed</Text>
					</Button>
				</View>
			)}
			{status === "paymentGateway" && (
				<StripePayment price={route.params.totalPrice} navigation={navigation} trackingScreen={trackingScreen} />
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	}
});

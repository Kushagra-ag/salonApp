import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { orderStatus } from '../../methods/miscMethods.js';
import { MaterialIcons } from '@expo/vector-icons';

export default function WaitScreen({ navigation, route }) {
	const [status, setStatus] = useState("waiting");
	const [time, setTime] = useState('5h');

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		let interval = setInterval(async () => {
	// 			console.log('in interval', route.params);
	// 			let response = await orderStatus(route.params.orderId);

	// 			if (1) {
	// 				setStatus(true);
	// 				clearInterval(interval);
	// 			}
	// 			setStatus(true);
	// 			clearInterval(interval);
	// 		}, 15000);

	// 		return clearInterval(interval);

	// 	}, [])
	// );
	useEffect(() => {
		console.log('in waitscreen');
		const orderCreated = route.params.orderCreated;
		const timeout = route.params.timeout;

		let interval = setInterval(function() {

			console.log('in interval', route.params.orderId);

			orderStatus({ orderId: route.params.orderId }, function(res) {
					console.log('ress', res);

					if(timeout && (Date.now() - orderCreated) > timeout) {
						setStatus("timeout")
						clearInterval(interval);
						return
					}

					if (res.orderStatus === "accepted") {
						console.log("accepted");
						clearInterval(interval);
						setStatus("accepted");
						navigation.navigate('RouteMap', {
								orderId: route.params.orderId,
								locations: [{latitude: route.params.position.latitude, longitude: route.params.position.longitude}, { latitude: res.seller[0], longitude: res.seller[1]}]
							
						})
						// clearInterval(interval);
					}
				}
			);
		}, 2000);
		// setStatus(true);
		// clearInterval(interval);

		return () => clearInterval(interval);
	}, []);

	return (
		<React.Fragment>
			{status === "waiting" && (
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
			{status === "timeout" && (
				<View style={styles.container}>
					<Text style={{ marginHorizontal: 20 }}>
						Your request timed out :(
					</Text>
				</View>
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

import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Modal,
	StyleSheet,
	Dimensions
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Input } from 'native-base';
import { addToCart, removeFromCart } from '../methods/cartMethods.js';
const { width, height } = Dimensions.get('window');

export function AddToCartModal(props) {
	const [qty, setQty] = useState('1');

	const handleChange = text => {
		text = JSON.stringify(parseInt(text)) === "null" ? '': JSON.stringify(parseInt(text));
		console.log(text)
		setQty(text);
	};

	useEffect(() => {
		
		setQty('1');
	}, [props.service.id])

	return (
		// <View style={{backgroundColor:"#00000055", height:height, width: width, display:props.visible?'flex':'none'}} >
		<Modal
			visible={props.visible}
			animationType="none"
			transparent={true}
			statusBarTranslucent={true}
			onRequestClose={() => props.setVisible(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modal}>
					<Text style={styles.modalTitle}>Add service</Text>
					<Text>
						{props.service.title} service description.
					</Text>
					<View style={styles.modalView}>
						<Text>Select quantity: </Text>
						<Input
							value={qty}
							keyboardType="number-pad"
							onChangeText={text => handleChange(text)}
							// selectTextOnFocus={true}
							autoFocus
						/>
					</View>
					<View
						style={{
							...styles.modalView,
							justifyContent: 'flex-end'
						}}
					>
						<Button
							transparent
							style={styles.modalBtn}
							onPress={() => props.setVisible(false)}
						>
							<Text style={styles.btnText}>Cancel</Text>
						</Button>
						<Button
							transparent
							style={styles.modalBtn}
							onPress={() => {
								Boolean(qty) && addToCart(props.service.id, qty);
								props.setVisible(false);
							}}
						>
							<Text style={styles.btnText}>Add</Text>
						</Button>
					</View>
				</View>
			</View>
		</Modal>
		// </View>
	);
}

export function RemoveFromCartModal(props) {

	const [qty, setQty] = useState('');
	const [initialQty, setInitialQty] = useState('')
	const [change, verifyChange] = useState(false)

	const handleChange = text => {
		text = JSON.stringify(parseInt(text)) === "null" ? '': JSON.stringify(parseInt(text));
		console.log(text)
		setQty(text);

		if(text != initialQty) {
			console.log("changed");
			verifyChange(true);
		} else {
			verifyChange(false)
		}
	};

	useEffect(() => {
		
		setQty(JSON.stringify(parseInt(props.service.qty)));
		setInitialQty(JSON.stringify(parseInt(props.service.qty)));
	}, [props.visible])

	

	return(
		<Modal
			visible={props.visible}
			animationType="none"
			transparent={true}
			statusBarTranslucent={true}
			onRequestClose={() => props.setVisible(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modal}>
					<Text style={styles.modalTitle}>Edit service</Text>
					<Text>
						{props.service.title} service description.
					</Text>
					<View style={styles.modalView}>
						<Text>Select quantity: </Text>
						<Input
							value={qty}
							keyboardType="number-pad"
							onChangeText={text => handleChange(text)}
							// selectTextOnFocus={true}
							autoFocus
						/>
					</View>
					<View
						style={{
							...styles.modalView,
							justifyContent: 'space-between'
						}}
					>
						<Button
							transparent
							style={styles.modalBtn}
							onPress={() => props.setVisible(false)}
						>
							<Text style={{...styles.btnText, color:'#777'}}>Cancel</Text>
						</Button>
						<View style={{flexDirection:'row'}}>
						<Button
							transparent
							style={styles.modalBtn}
							onPress={async () => {
								props.setVisible(false);
								await removeFromCart(props.service.id);
								props.refreshCart();
							}}
						>
							<Text style={styles.btnText}>Remove</Text>
						</Button>
						<Button
							transparent
							style={styles.modalBtn}
							onPress={async () => {
								props.setVisible(false);
								if(change && Boolean(qty)) {
									await addToCart(props.service.id, qty);
									props.refreshCart();
								}
							}}
						>
							<Text style={styles.btnText}>Save</Text>
						</Button>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 22,
		backgroundColor: "#00000055"
	},
	modal: {
		// margin: 16,
		width: "85%",
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 35,
		paddingBottom: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	modalTitle: {
		fontSize: 20,
		marginBottom: 10
	},
	modalView: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		// justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10
	},
	modalBtn: {
		marginHorizontal: 10
	},
	btnText: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#f85f6a',
		fontSize: 15
	}
});

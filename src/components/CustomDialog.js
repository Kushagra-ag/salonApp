import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Modal,
	StyleSheet,
	Dimensions
} from 'react-native';
import { Button, Input } from 'native-base';
import { addToCart } from '../methods/cartMethods.js';
const { width, height } = Dimensions.get('window');

export default function CustomDialog(props) {
	const [qty, setQty] = useState('1');

	const handleChange = text => {
		setQty(text);
	};

	useEffect(() => {
		console.log('in CustomDialog');
		// console.log(props.service)
	}, []);

	return (
		<Modal
			visible={props.visible}
			animationType="none"
			transparent={true}
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
								addToCart(props.service.id, qty);
								props.setVisible(false);
							}}
						>
							<Text style={styles.btnText}>Add</Text>
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
}

export function editItemModal(props) {

	return(
		null
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
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

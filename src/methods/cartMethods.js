import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
import axios from 'axios';
import { profileCheck } from './authMethods.js';
import { API } from './config.js';

const options = {
    'content-type': 'application/json'
};

export const addToCart = async s => {
    try {
        const profile = await profileCheck();
        const {
            user: { email }
        } = profile;

        let cart = await AsyncStorage.getItem(`@e_beauty_cart__${email}`);
        if (!cart) {
            console.log('null');
            cart = s;
        } else {
            // console.log('whole cart - ', cart);
            const uni = duplicateCheck(s, cart.split(','));

            if (!uni) {
                return Toast.show({
                    text: 'Service already added to cart',
                    buttonText: ''
                });
            }

            cart = cart + ',' + s;
        }
        await AsyncStorage.setItem(`@e_beauty_cart__${email}`, cart);

        Toast.show({
            text: 'Service added to cart',
            buttonText: ''
        });
    } catch (e) {
        console.log(e);
        Toast.show({
            text: 'Could not add Service to cart',
            buttonText: ''
        });
    }
};

export const removeFromCart = async (s, next) => {
    try {
        let profile = await profileCheck();
        const {
            user: { email }
        } = profile;

        let cart = await AsyncStorage.getItem(`@e_beauty_cart__${email}`);
        if (!cart) {
            console.log('null');
            cart = s;
        } else {
            // console.log(cart);
            cart = cart.split(',');

            const index = cart.indexOf(s);
            cart.splice(index, 1);

            await AsyncStorage.setItem(
                `@e_beauty_cart__${email}`,
                cart.toString()
            );

            Toast.show({
                text: 'Service deleted from cart',
                buttonText: ''
            });

            next(s);
        }
    } catch (e) {
        Toast.show({
            text: 'Could not delete service from cart',
            buttonText: ''
        });
    }
};

export const alertBox = (e, s, service) => {
    console.log(service);
    Alert.alert(
        `${service}`,
        `One line description. Do you want to add '${service}' to your cart?`,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Add to Cart',
                onPress: () => {
                    console.log('Add Pressed');
                    addToCart(s);
                }
            }
        ],
        { cancelable: true }
    );
};

export const alertBoxRemove = (e, s, service, next) => {
    console.log(service);
    Alert.alert(
        'Remove Item',
        `Are you sure you want to remove ${service}`,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: () => {
                    console.log('Remove Pressed');
                    removeFromCart(s, next);
                }
            }
        ],
        { cancelable: true }
    );
};

const duplicateCheck = (currentSer, arr) => {
    let flag = 1;

    arr.forEach(service => {
        // console.log('current ser - ', service);
        if (service === currentSer) flag = 0;
    });

    return flag;
};

export const getCart = async () => {
    // await AsyncStorage.removeItem(`@e_beauty_cart__${email}`);
    let profile = await profileCheck();
    const {
        user: { email }
    } = profile;

    let items = await AsyncStorage.getItem(`@e_beauty_cart__${email}`);
    console.log(items);

    if (items) {
        items = items.split(',');
        return items;
    }

    return null;
};

// Fetching product details

export const fetchProduct = (id, next) => {
    axios
        .get(`${API}product/${id}`, {
            header: options
        })
        .then(res => {
            // console.log(res.data.product);
            if (res.data.success) {
                next({
                    name: res.data.product.displayName,
                    title: res.data.product.title,
                    price: res.data.product.price,
                    _id: res.data.product._id,
                    img: res.data.product.image,
                    description: res.data.product.description
                });
            } else return null;
        })
        .catch(e => null);
};

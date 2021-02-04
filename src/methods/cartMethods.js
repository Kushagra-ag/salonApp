import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Text, TextInput, View } from 'react-native';
import { Toast, Button } from 'native-base';
import axios from 'axios';
import { profileCheck } from './authMethods.js';
import { API } from './config.js';

const options = {
    'content-type': 'application/json'
};

export const addToCart = async (s, qty) => {
    console.log('s-',s);
    try {
        const profile = await profileCheck();
        const {
            user: { email }
        } = profile;

        let cart = await AsyncStorage.getItem(`@e_beauty_cart__${email}`);
        if (!cart) {
            cart = [{id: s, qty: qty}]
        } else {
            console.log('whole cart - ', cart);
            cart = JSON.parse(cart);
            const uni = duplicateCheck(s, cart);

            if (uni!=null) {

                console.log("item found!")
                cart[uni].id = s;
                cart[uni].qty = qty
            } else {
                cart.push({id: s, qty: qty})
            }
        }
        await AsyncStorage.setItem(`@e_beauty_cart__${email}`, JSON.stringify(cart));

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
            return
        } else {
            // console.log(cart);
            cart = JSON.parse(cart)

            const index = cart.map(item => item.id).indexOf(s)
            cart.splice(index, 1);          // delete cart[s]

            await AsyncStorage.setItem(
                `@e_beauty_cart__${email}`,
                JSON.stringify(cart)
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
    let flag = null;

    arr.forEach((service, idx) => {
        if (service.id === currentSer) flag = idx;
    });

    return flag
};

export const getCart = async () => {
    
    let profile = await profileCheck();
    const {
        user: { email }
    } = profile;

    // await AsyncStorage.removeItem(`@e_beauty_cart__${email}`);

    let items = await AsyncStorage.getItem(`@e_beauty_cart__${email}`);
    // console.log('from getcart', items);

    if (items) {
        console.log('from getcart', JSON.parse(items));
        return JSON.parse(items);
    }

    return null;
};

// Fetching product details

export const fetchProduct = (id, next, qty) => {
    axios
        .get(`${API}product/${id}`, {
            headers: options
        })
        .then(res => {
            // console.log('succ?-', res.data.success);
            if (res.data.success) {
                next({
                    name: res.data.product.displayName,
                    title: res.data.product.title,
                    price: res.data.product.price,
                    totalPrice: res.data.product.price * qty,
                    _id: res.data.product._id,
                    img: res.data.product.image,
                    description: res.data.product.description,
                    qty: qty || 1
                });
            } else return null;
        })
        .catch(e => null);
};

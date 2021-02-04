import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { STRIPE } from './stripeConfig';
import { getCart } from '../methods/cartMethods.js';
import { payment } from '../methods/miscMethods.js';
import {
    stripeCheckoutRedirectHTML,
    success,
    failure
} from './stripeCheckout_';
import { Header, Left, Right, Body, Title, Button, Icon } from 'native-base';
import axios from 'axios';

const PurchaseProduct = ({ route, navigation }) => {

    const [loading, setLoading] = useState(true);
    const [webPage, setWebPage] = useState('stripeCheckoutRedirectHTML');

    useEffect(() => {
        setLoading(false);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setWebPage('stripeCheckoutRedirectHTML')
        }, [])
    );

    const onMessage = async event => {
        const { data } = event.nativeEvent;
        console.log('data from on message - ', data);

        const cart = {
            products: await getCart(),
            totalPrice: route.params.price
        };

        payment(data, cart, setWebPage)
    };

    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Checkout</Title>
                </Body>
                <Right />
            </Header>
            {!loading ? (
                <WebView
                    javaScriptEnabled={true}
                    originWhitelist={['*']}
                    source={{
                        html:
                            webPage === 'stripeCheckoutRedirectHTML'
                                ? stripeCheckoutRedirectHTML(
                                      STRIPE.PUBLIC_KEY,
                                      route.params.price
                                  )
                                : webPage === 'success'
                                ? success()
                                : failure()
                    }}
                    // injectedJavaScript={injectedJavaScript}
                    onMessage={onMessage}
                    scalesPageToFit={false}
                />
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )}
        </React.Fragment>
    );
};

export default PurchaseProduct;

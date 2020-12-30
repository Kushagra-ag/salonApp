import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeConfig';
import { getCart } from '../methods/cartMethods.js';
import { stripeCheckoutRedirectHTML } from './stripeCheckout_';
import { Header, Left, Right, Body, Title, Button, Icon } from 'native-base';
import axios from 'axios';

const PurchaseProduct = ({ route, navigation }) => {
    // TODO: this should come from some service/state store
    // const user = { id: 'abcd' };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const onSuccessHandler = () => {
        /* TODO: do something */
        console.log('success calleed');
        navigation.navigate('Home');
    };
    const onCanceledHandler = () => {
        /* TODO: do something */
        console.log('fail calleed');
    };

    // Called everytime the URL stats to load in the webview
    const onLoadStart = syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        if (nativeEvent.url === STRIPE.SUCCESS_URL) {
            onSuccessHandler();
            return;
        }
        if (nativeEvent.url === STRIPE.CANCELED_URL) {
            onCanceledHandler();
        }
    };

    const cart = {
        products: getCart(),
        totalPrice: route.params.price
    };

    const onCheckStatus = async paymentResponse => {
        console.log('Please wait while confirming your payment!');
        // setResponse(paymentResponse)

        let jsonResponse = JSON.parse(paymentResponse);
        console.log('paymentResponse -  ', paymentResponse);
        // perform operation to check payment status

        try {
            const stripeResponse = await axios.post(
                'http://ebeauty-env.eba-gtswwx6z.ap-south-1.elasticbeanstalk.com/api/payment',
                {
                    email: 'codergogoi@gmail.com',
                    cart: cart,
                    authToken: jsonResponse
                },
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            );

            console.log(
                'after axios response - ',
                stripeResponse.data.response
            );

            if (stripeResponse.data) {
                const { paid } = stripeResponse.data.response;
                if (paid === true) {
                    console.log('Payment Success');
                } else {
                    console.log('Payment failed due to some issue1');
                }
            } else {
                console.log(' Payment failed due to some issue2');
            }
        } catch (error) {
            console.log(' Payment failed due to some issue3');
            console.log(error);
        }
    };

    const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

    const onMessage = event => {
        const { data } = event.nativeEvent;
        console.log('data from on message - ', data);
        onCheckStatus(data);
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
                        html: stripeCheckoutRedirectHTML(
                            STRIPE.PUBLIC_KEY,
                            route.params.price
                        )
                    }}
                    onLoadStart={onLoadStart}
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

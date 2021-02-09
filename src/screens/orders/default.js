import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Right,
    Button,
    Icon,
    Body,
    Title,
    Item,
    Input,
    Label
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getOrders, getOrder } from '../../methods/miscMethods.js';
import stylesCtm from '../../styles';
// import { alertBox } from '../../../methods/cartMethods.js';

export default function Profile({ navigation }) {
    const [orders, addOrders] = useState([]);

    const back = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        });
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', back);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', back);
            };
        }, [])
    );

    const handleOrders = res => {
        // console.log(res);
        return addOrders(orders => [...orders, res]);
    };

    const repeatOrder = id => {
        const success = (cart, price) => {
            let repeatCart = cart.map(product => {
                product.id = product.product._id;
                product.qty = product.quantity;

                delete product.quantity;
                delete product.product;
                delete product._id;
                return product;
            });

            navigation.navigate('Tracking', {
                screen: 'Index',
                params: {
                    price,
                    repeatCart
                }
            });
        };

        getOrder(id, success);
    };

    useEffect(() => {
        addOrders([]);
        getOrders(handleOrders);
    }, []);

    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={back}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>My orders</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <Text style={stylesCtm.heading}>My Orders</Text>
                <View style={{ paddingVertical: 20 }}>
                    <List>
                        {orders.length > 0 &&
                            orders.map(order =>
                                order ? (
                                    <ListItem key={order._id}>
                                        <Body>
                                            <Text
                                                style={
                                                    stylesCtm.orderDetailsHeading
                                                }
                                            >
                                                {`${Date(order.created).slice(
                                                    4,
                                                    10
                                                )}, ${Date(order.created).slice(
                                                    11,
                                                    15
                                                )}`}
                                            </Text>
                                            <View>
                                                {order.products.map(product => (
                                                    <View
                                                        style={
                                                            stylesCtm.orderDetailsView
                                                        }
                                                    >
                                                        <Text>
                                                            {
                                                                product.product
                                                                    .title
                                                            }
                                                        </Text>

                                                        <Text
                                                            style={styles.align}
                                                        >{`${product.quantity} x \$${product.product.price}`}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                            <View
                                                style={
                                                    stylesCtm.orderDetailsView
                                                }
                                            >
                                                <View>
                                                    <Text style={styles.margin}>
                                                        Total Price
                                                    </Text>
                                                    <Text>Status</Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={{
                                                            ...styles.align,
                                                            ...styles.margin,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {`\$${order.totalPrice}`}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {order.status}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Button
                                                dark
                                                block
                                                style={{
                                                    marginHorizontal: 0,
                                                    marginVertical: 20
                                                }}
                                                onPress={() =>
                                                    repeatOrder(order._id)
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name="history"
                                                    size={24}
                                                    color="white"
                                                    style={{
                                                        paddingHorizontal: 10
                                                    }}
                                                />
                                                <Text
                                                    style={{
                                                        ...stylesCtm.buttonText
                                                    }}
                                                >
                                                    Reorder
                                                </Text>
                                            </Button>
                                        </Body>
                                    </ListItem>
                                ) : null
                            )}
                    </List>
                </View>
            </ScrollView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    margin: {
        marginTop: 20
    },
    align: {
        alignSelf: 'flex-end'
    }
});

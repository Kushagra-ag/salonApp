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
import { getOrders } from '../../methods/miscMethods.js';
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

    const handleOrders = res => addOrders(orders => [...orders, res]);

    useEffect(() => {
        addOrders([]);
        getOrders(handleOrders)
    }, [])

    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={back}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
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
                                    <ListItem
                                        
                                        key={order._id}
                                    >
                                        
                                        <Body>
                                            <Text style={stylesCtm.orderDetailsHeading}>
                                                {Date(order.created).slice(4,15)}
                                            </Text>
                                            <View style={stylesCtm.orderDetailsView}>

                                                {
                                                    
                                                    order.products.map(product => 

                                                        <React.Fragment>
                                                            
                                                            <Text>{product.product.title}</Text>
                                                            
                                                            <Text style={styles.align}>{`${product.quantity} x \$${product.product.price}`}</Text>
                                                        </React.Fragment>
                                                    )
                                                }
                                            </View>
                                            <View style={stylesCtm.orderDetailsView}>
                                            
                                                <View>
                                                    
                                                    <Text style={styles.margin}>Total Price</Text>
                                                    <Text>
                                                        Status
                                                    </Text>
                                                </View>
                                                <View>
                                                    
                                                    <Text style={{...styles.align, ...styles.margin, fontWeight:'bold'}}>
                                                        {`\$${order.totalPrice}`}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {order.status}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Body>
                                        
                                    </ListItem>
                                ) : null
                            )}
                        </List>

                        <Button
                            dark
                            block
                            style={{ marginHorizontal: 40, marginVertical: 40 }}
                            onPress={back}
                        >
                            <Text style={stylesCtm.buttonText}>Back</Text>
                        </Button>
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

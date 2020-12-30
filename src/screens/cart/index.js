import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import {
    Col,
    Row,
    Grid,
    Container,
    Header,
    Form,
    Thumbnail,
    Item,
    Input,
    Left,
    Right,
    Label,
    Button,
    Icon,
    Body,
    Title,
    List,
    ListItem
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import stylesCtm from '../../styles';
import BottomNav from '../../components/BottomNav.js';
import {
    alertBoxRemove,
    fetchProduct,
    getCart
} from '../../methods/cartMethods.js';

export default function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [amt, setAmt] = useState(0);
    const [status, setStatus] = useState(0);

    const populateCart = async res => {
        setCartItems(services => [...services, res]);
        setPrice(res.price, 'add');
    };

    const removeItem = id => {
        cartItems.forEach(async item => {
            if (item._id === id) {
                setCartItems(cartItems => cartItems.filter(_ => _ !== item));
                setPrice(item.price, 'rem');
            }
        });
    };

    const setPrice = (p, action) => {
        action === 'add'
            ? setAmt(amt => amt + parseInt(p, 10))
            : setAmt(amt => amt - parseInt(p, 10));
        if (amt < 0) setAmt(0);
    };

    useFocusEffect(
        React.useCallback(() => {
            setCartItems([]);
            setAmt(0);
            getCart().then(res => {
                if (res) {
                    res.map(id => {
                        fetchProduct(id, populateCart);
                    });
                }
            });
        }, [])
    );

    return (
        <React.Fragment>
            <Header noLeft>
                <Left />
                <Body>
                    <Title>Cart</Title>
                </Body>
                <Right />
            </Header>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Text style={stylesCtm.heading}>My Cart</Text>
                    <View style={{ paddingVertical: 20 }}>
                        <List>
                            {cartItems.length > 0 &&
                                cartItems.map(item => (
                                    <ListItem
                                        thumbnail
                                        key={item._id}
                                        onPress={e =>
                                            alertBoxRemove(
                                                e,
                                                item._id,
                                                item.title,
                                                removeItem
                                            )
                                        }
                                    >
                                        <Left>
                                            <Thumbnail
                                                square
                                                source={{ uri: item.img }}
                                            />
                                        </Left>
                                        <Body>
                                            <Text style={stylesCtm.listItem}>
                                                {item.title}
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text> {`\$${item.price}`} </Text>
                                        </Right>
                                    </ListItem>
                                ))}

                            <ListItem thumbnail key="TotalAmt">
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Grand total
                                    </Text>
                                </Body>
                                <Right>
                                    <Text
                                        style={{ fontWeight: 'bold' }}
                                    >{`\$${amt}`}</Text>
                                </Right>
                            </ListItem>
                        </List>
                        <Button
                            dark
                            block
                            disbaled
                            style={{ marginHorizontal: 40, marginVertical: 40 }}
                            onPress={
                                () => navigation.navigate('Tracking')
                                // navigation.navigate("Stripe", {
                                //     price: amt,
                                // })
                            }
                        >
                            <Text style={stylesCtm.buttonText}>
                                Proceed to checkout
                            </Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNav navigation={navigation} />
        </React.Fragment>
    );
}

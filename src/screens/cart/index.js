import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet
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
    fetchProduct,
    getCart,
    alertBoxDelete
} from '../../methods/cartMethods.js';
import { RemoveFromCartModal } from '../../components/modals.js';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [amt, setAmt] = useState(0);
    const [visible, setVisible] = useState(false);
    const [curService, setCurService] = useState({});
    const [cartChanged, setCartChanged] = useState(0);

    const populateCart = async res => {
        setCartItems(services => [...services, res]);
        setPrice(res.totalPrice, 'add');
    };

    // const removeItem = id => {
    //     cartItems.forEach(async item => {
    //         if (item._id === id) {
    //             setCartItems(cartItems => cartItems.filter(_ => _ !== item));
    //             setPrice(item.totalPrice, 'sub');
    //         }
    //     });
    // };

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
                    res.map(ser => {
                        fetchProduct(ser.id, populateCart, ser.qty);
                    });
                }
            });
        }, [cartChanged])
    );

    return (
        <React.Fragment>
            <Header noLeft>
                <Left />
                <Body>
                    <Title>Cart</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => alertBoxDelete(() => setCartItems([]))}
                        disabled={Boolean(cartItems.length === 0)}
                    >
                        <MaterialIcons name="delete" size={24} color="#000" />
                    </Button>
                </Right>
            </Header>
            <ScrollView keyboardShouldPersistTaps="handled">
                <RemoveFromCartModal
                    visible={visible}
                    setVisible={setVisible}
                    service={curService}
                    refreshCart={() => setCartChanged(!cartChanged)}
                />
                <Text style={stylesCtm.heading}>My Cart</Text>
                <View style={{ paddingVertical: 20 }}>
                    {cartItems.length > 0 ? (
                        <React.Fragment>
                            <List>
                                {cartItems.map(item => (
                                    <ListItem
                                        thumbnail
                                        key={item._id}
                                        onPress={e => {
                                            setVisible(true);
                                            setCurService({
                                                title: item.title,
                                                id: item._id,
                                                qty: item.qty
                                            });
                                        }
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
                                            <Text
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 'normal'
                                                    }}
                                                >{`${item.qty} x  `}</Text>
                                                {`\$${item.price}`}
                                            </Text>
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
                                disabled={amt > 0 ? false : true}
                                style={{
                                    marginHorizontal: 40,
                                    marginVertical: 40
                                }}
                                onPress={() =>
                                    // navigation.navigate('Stripe', {
                                    //     price: amt
                                    // })
                                    navigation.navigate('Tracking', {
                                        screen: 'Index',
                                        params: {
                                            price: amt
                                        }
                                    })
                                }
                            >
                                <Text style={stylesCtm.buttonText}>
                                    Proceed to checkout
                                </Text>
                            </Button>
                        </React.Fragment>
                    ) : (
                        <View style={styles.err}>
                            <MaterialCommunityIcons
                                name="cart-off"
                                size={200}
                                color="#607d8b44"
                                style={{ paddingBottom: 30 }}
                            />
                            <Text style={{ color: '#000' }}>
                                Your cart is empty
                            </Text>
                            <Button
                                dark
                                block
                                style={{
                                    marginHorizontal: 40,
                                    marginVertical: 40
                                }}
                                onPress={() =>
                                    navigation.navigate('Services', {
                                        screen: 'Index'
                                    })
                                }
                            >
                                <Text style={stylesCtm.buttonText}>
                                    Go to Services
                                </Text>
                            </Button>
                        </View>
                    )}
                </View>
            </ScrollView>
            <BottomNav />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    address: {
        fontSize: 15,
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 5,
        paddingVertical: 20,
        borderWidth: 0
    },
    err: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    errBox: {
        backgroundColor: '#607d8b11',
        color: '#607d8b',
        paddingHorizontal: 10,
        paddingVertical: 20,
        textAlign: 'center'
    },
    permDenied: {
        flex: 1
    },

    localBtn: {
        marginTop: 10
    }
});

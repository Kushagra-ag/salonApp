import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
import { logout, profileCheck } from '../../methods/authMethods.js';

export default function SideMenu({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const menuItems = [
        {
            title: 'Home',
            icon: 'ios-home',
            id: 'home',
            onPress: () => navigation.navigate('Home')
        },
        {
            title: 'Cart',
            icon: 'ios-cart',
            id: 'cart',
            onPress: () => navigation.navigate('Cart')
        },
        {
            title: 'My profile',
            icon: 'ios-person',
            id: 'person',
            onPress: () => navigation.navigate('Profile')
        },
        {
            title: 'My orders',
            icon: 'ios-person',
            id: 'orders',
            onPress: () => navigation.navigate('Orders')
        },
        {
            title: 'Logout',
            icon: 'ios-unlock',
            id: 'logout',
            onPress: () =>
                logout(function () {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Auth' }]
                    });
                })
        }
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={item.onPress}
            style={{ ...styles.headerView, ...styles.listItem }}
        >
            <Ionicons
                color="black"
                size={30}
                name={item.icon}
                style={{ marginRight: 20 }}
            />
            <Text style={{ fontSize: 15 }}>{item.title}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        profileCheck()
            .then(res => {
                if (res) {
                    setProfile(res.user);
                    setLoading(false);
                } else {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Auth' }]
                    });
                    return;
                }
            })
            .catch(e => {
                console.log(e);
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }]
                });
                return;
            });
    }, []);

    return (
        !loading &&
        Boolean(profile) && (
            <React.Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon
                                name="arrow-back"
                                style={{ fontSize: 24 }}
                                style={{ fontSize: 24 }}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Menu</Title>
                    </Body>
                    <Right />
                </Header>
                <SafeAreaView>
                    <View style={{ paddingVertical: 20 }}>
                        <View style={styles.headerView}>
                            <View style={styles.headerImg}>
                                <Image
                                    style={styles.headerImg}
                                    source={require('../../../assets/app/default.png')}
                                />
                            </View>
                            <View style={styles.headerDetails}>
                                <Text style={styles.headerName}>
                                    {profile.name}
                                </Text>
                                <Text style={styles.headerDetails}>
                                    {profile.email}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <FlatList
                                data={menuItems}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <Button
                            dark
                            block
                            style={{
                                marginHorizontal: 40,
                                marginVertical: 40
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={stylesCtm.buttonText}>Back</Text>
                        </Button>
                    </View>
                </SafeAreaView>
            </React.Fragment>
        )
    );
}

const styles = StyleSheet.create({
    headerView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 35,
        marginBottom: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    headerImg: {
        height: 50,
        width: 50,
        borderRadius: 15,
        marginRight: 20
    },
    headerName: {
        fontSize: 18,
        textTransform: 'capitalize'
    },
    headerDetails: {
        color: '#999',
        justifyContent: 'center'
    },
    listItem: {
        marginBottom: 0,
        paddingBottom: 0,
        paddingVertical: 20,
        borderBottomWidth: 0
    }
});

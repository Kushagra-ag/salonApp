import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { StackActions, CommonActions } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Container } from 'native-base';
import * as Notifications from 'expo-notifications';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { logout, profileCheck } from '../methods/authMethods.js';
import Home from './home.js';
import Cart from './cart';
import Services from './services';
import Tracking from './tracking';
import Profile from './profile';
import Orders from './orders';
import Stripe from '../stripe/purchaseProduct.js';
import Menu from './sideMenu';
import stylesCtm, { horizontalAnimation } from '../styles';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContentAndroid(props) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        profileCheck()
            .then(res => {
                // console.log('from ctmdrwrcomp - ', res);
                if (res) {
                    // res = JSON.parse(res);
                    console.log('res - ', res.user);
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
            <DrawerContentScrollView {...props}>
                <View style={stylesCtm.sidebarContainer}>
                    <View style={styles.headerView}>
                        <Image
                            style={styles.headerImg}
                            source={{ uri: profile.picture }}
                        />
                        <Text style={styles.headerName}>{profile.name}</Text>
                        <Text style={styles.headerDetails}>
                            {profile.email}
                        </Text>
                    </View>
                    <DrawerItem
                        label="Home"
                        icon={({ focused, size, color }) => (
                            <MaterialIcons
                                color={color}
                                size={size}
                                name="home"
                            />
                        )}
                        labelStyle={stylesCtm.sidebarLabel}
                    />
                    <DrawerItem
                        label="My Cart"
                        onPress={() => {
                            props.navigation.navigate('Cart');
                        }}
                        icon={({ focused, size, color }) => (
                            <MaterialIcons
                                color={color}
                                size={size}
                                name="shopping-cart"
                            />
                        )}
                        labelStyle={stylesCtm.sidebarLabel}
                    />

                    {
                        <DrawerItem
                            label="My Profile"
                            onPress={() => {
                                props.navigation.navigate('Profile');
                            }}
                            icon={({ focused, size, color }) => (
                                <MaterialIcons
                                    color={color}
                                    size={size}
                                    name="person"
                                />
                            )}
                            labelStyle={stylesCtm.sidebarLabel}
                        />
                    }
                    {
                        <DrawerItem
                            label="My Orders"
                            onPress={() => {
                                props.navigation.navigate('Orders');
                            }}
                            icon={({ focused, size, color }) => (
                                <MaterialIcons
                                    color={color}
                                    size={size}
                                    name="person"
                                />
                            )}
                            labelStyle={stylesCtm.sidebarLabel}
                        />
                    }
                    <DrawerItem
                        label="Logout"
                        onPress={() =>
                            logout(function () {
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Auth' }]
                                });
                            })
                        }
                        icon={({ focused, size, color }) => (
                            <MaterialCommunityIcons
                                name="logout"
                                size={size}
                                color={color}
                            />
                        )}
                        labelStyle={stylesCtm.sidebarLabel}
                    />

                    <View style={stylesCtm.sidebarFooter}>
                        <Text>Ebeauty &#8226; Terms of services</Text>
                    </View>
                </View>
            </DrawerContentScrollView>
        )
    );
}

export default function Screens({ navigation }) {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(
            notification => {
                setNotification(notification);
                console.log('The recd notif is - ', notification);
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            // Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    return (
        <Container>
            <SafeAreaView style={stylesCtm.safeAreaView}>
                {Platform.OS == 'ios' ? (
                    <Stack.Navigator initialRouteName="Home" headerMode="none">
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Services" component={Services} />
                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="Tracking" component={Tracking} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Orders" component={Orders} />
                        <Stack.Screen name="Stripe" component={Stripe} />
                        <Stack.Screen name="Menu" component={Menu} />
                    </Stack.Navigator>
                ) : (
                    <Drawer.Navigator
                        initialRouteName="Home"
                        headerMode="none"
                        drawerPosition="right"
                        // unmountOnBlur="true"
                        screenOptions={{ swipeEnabled: false }}
                        drawerContent={props => (
                            <CustomDrawerContentAndroid {...props} />
                        )}
                    >
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Services" component={Services} />
                        <Drawer.Screen name="Cart" component={Cart} />
                        <Drawer.Screen name="Tracking" component={Tracking} />
                        <Drawer.Screen name="Profile" component={Profile} />
                        <Drawer.Screen name="Orders" component={Orders} />
                        <Drawer.Screen name="Stripe" component={Stripe} />
                    </Drawer.Navigator>
                )}
            </SafeAreaView>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerView: {
        padding: 20,
        marginBottom: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    headerImg: {
        height: 80,
        width: 80,
        borderRadius: 15,
        marginBottom: 20
    },
    headerName: {
        fontSize: 18,
        textTransform: 'capitalize'
    },
    headerDetails: {
        color: '#999'
    }
});

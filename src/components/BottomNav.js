import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Button, Footer, FooterTab } from 'native-base';
import stylesCtm from '../styles';

export default function BottomNav() {
    const navigation = useNavigation();

    // const isDrawerOpen = useIsDrawerOpen();

    useEffect(() => {
        // console.log(navigation)
    }, []);

    return (
        <Footer style={stylesCtm.footer}>
            {Platform.OS == 'ios' ? (
                <FooterTab>
                    <Button
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            })
                        }
                    >
                        <Ionicons
                            name={
                                Platform.OS === 'ios' ? 'ios-home' : 'md-home'
                            }
                            size={24}
                            color="#888"
                        />
                    </Button>
                    <Button>
                        <Ionicons name="md-search" size={24} color="#888" />
                    </Button>
                    <Button onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={24} color="#888" />
                    </Button>
                    <Button onPress={() => navigation.navigate('Menu')}>
                        <Ionicons name="ios-more" size={24} color="#888" />
                    </Button>
                </FooterTab>
            ) : (
                <FooterTab>
                    <Button
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            })
                        }
                    >
                        <Ionicons name="md-home" size={24} color="#000" />
                    </Button>
                    <Button>
                        <Ionicons name="md-search" size={24} color="#000" />
                    </Button>
                    <Button onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="md-cart" size={24} color="#000" />
                    </Button>
                    <Button onPress={() => navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" size={24} color="#000" />
                    </Button>
                </FooterTab>
            )}
        </Footer>
    );
}

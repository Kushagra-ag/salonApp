import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
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
import { logout, profileCheck } from '../../methods/authMethods.js';

export default function Cart({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

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
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
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
                            <Button
                                dark
                                block
                                style={{
                                    marginHorizontal: 40,
                                    marginVertical: 40
                                }}
                                onPress={() =>
                                    navigation.navigate('Stripe', {
                                        price: amt
                                    })
                                }
                            >
                                <Text style={stylesCtm.buttonText}>
                                    Proceed to checkout
                                </Text>
                            </Button>
                        </View>
                    </ScrollView>
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
    }
});

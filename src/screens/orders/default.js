import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
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
import stylesCtm from '../../styles';
// import { alertBox } from '../../../methods/cartMethods.js';

export default function Profile({ navigation }) {
    const [details, setDetails] = useState({
        name: 'kushagra',
        email: 'test@test.com',
        mobile: 'test'
    });

    const handleChange = (text, name) => {
        setDetails({ ...details, [name]: text });
        // console.log(cred)
    };

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
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Text style={stylesCtm.heading}>My Orders</Text>
                    <View style={{ paddingVertical: 20 }}>
                        <List>
                            <ListItem onPress={() => null}>
                                <Body>
                                    <Text style={stylesCtm.orderDetailsHeading}>
                                        12 November 20
                                    </Text>
                                    <View style={stylesCtm.orderDetailsView}>
                                        <View>
                                            <Text>Total Items</Text>
                                            <Text>Total Price</Text>
                                            <Text style={styles.status}>
                                                Status
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.align}>3</Text>
                                            <Text style={styles.align}>
                                                $45
                                            </Text>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    ...styles.status
                                                }}
                                            >
                                                Completed
                                            </Text>
                                        </View>
                                    </View>
                                </Body>
                            </ListItem>
                        </List>

                        <Button
                            dark
                            block
                            style={{ marginHorizontal: 40, marginVertical: 40 }}
                            onPress={() => null}
                        >
                            <Text style={stylesCtm.buttonText}>Save</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    status: {
        marginTop: 10
    },
    align: {
        alignSelf: 'flex-end'
    }
});

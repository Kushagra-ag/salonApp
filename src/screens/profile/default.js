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
import { sendPushNotification } from '../../methods/notifMethods.js';
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
            
                <ScrollView>
                    <Text style={stylesCtm.heading}>My profile</Text>
                    <View style={{ padding: 20 }}>
                        <Image
                            style={styles.headerImg}
                            source={require('../../../assets/app/default.png')}
                        />
                        <Item inlineLabel style={{ marginBottom: 10 }}>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={details.name}
                                onChangeText={text =>
                                    handleChange(text, 'name')
                                }
                            />
                        </Item>
                        <Item inlineLabel style={{ marginBottom: 10 }}>
                            <Label>Email</Label>
                            <Input
                                type="text"
                                name="email"
                                value={details.email}
                                onChangeText={text =>
                                    handleChange(text, 'email')
                                }
                            />
                        </Item>
                        <Item inlineLabel style={{ marginBottom: 20 }}>
                            <Label>Mobile</Label>
                            <Input
                                type="text"
                                name="mobile"
                                value={details.mobile}
                                onChangeText={text =>
                                    handleChange(text, 'mobile')
                                }
                            />
                        </Item>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Password')}
                        >
                            <Text
                                style={{
                                    color: '#999',
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline'
                                }}
                            >
                                Click here to change Password
                            </Text>
                        </TouchableOpacity>
                        <Button
                            dark
                            block
                            style={{ marginHorizontal: 40, marginVertical: 40 }}
                            onPress={() => sendPushNotification()}
                        >
                            <Text style={stylesCtm.buttonText}>Save</Text>
                        </Button>
                    </View>
                </ScrollView>
            
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    headerImg: {
        height: 130,
        width: 130,
        borderRadius: 25,
        marginBottom: 40,
        alignSelf: 'center'
    }
});

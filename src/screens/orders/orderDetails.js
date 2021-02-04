import React, { useState } from 'react';

import { StyleSheet, View, Text, Image, BackHandler, ScrollView } from 'react-native';
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
import stylesCtm from '../../styles';
// import { alertBox } from '../../../methods/cartMethods.js';

export default function Profile({ navigation }) {
    const [details, setDetails] = useState({
        pass: '',
        confirmPass: ''
    });

    const handleChange = (text, name) => {
        setDetails({ ...details, [name]: text });
        // console.log(cred)
    };

    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Change Password</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
            <Text style={stylesCtm.heading}>Set your new password</Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Item inlineLabel style={{ marginBottom: 10 }}>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        name="password"
                        value={details.pass}
                        onChangeText={text => handleChange(text, 'pass')}
                    />
                </Item>
                <Item inlineLabel style={{ marginBottom: 10 }}>
                    <Label>Retype password</Label>
                    <Input
                        secureTextEntry={true}
                        name="email"
                        value={details.confirmPass}
                        onChangeText={text => handleChange(text, 'confirmPass')}
                    />
                </Item>
                <Button
                    dark
                    block
                    style={{ marginHorizontal: 40, marginVertical: 40 }}
                    onPress={() => null}
                >
                    <Text style={stylesCtm.buttonText}>Set Password</Text>
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
        marginBottom: 40
        // alignSelf: 'center'
    }
});

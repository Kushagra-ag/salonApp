import React, { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import {
    Container,
    Header,
    Content,
    Form,
    H3,
    Item,
    Input,
    Left,
    Label,
    Button,
    Icon,
    Body,
    Title,
    ListItem
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import stylesCtm from '../../styles';
import { register } from '../../methods/authMethods.js';
import axios from 'axios';

export default function Register({ navigation }) {
    const [cred, setCred] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [err, setErr] = useState('');
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChecked = () => {
        console.log('in check ');
        setChecked(!checked);
    };

    const handleChange = (text, name) => {
        // console.log(name);
        // console.log(text)

        setCred({ ...cred, [name]: text });
        // console.log(cred)
    };

    const onSubmit = async () => {
        await setCred({
            ...cred,
            email: cred.email.trim(),
            name: cred.name.trim()
        });

        if (
            !cred.email ||
            !cred.password ||
            !cred.repeatPassword ||
            !cred.name
        ) {
            setErr('All fields are required');
            return;
        }

        if (cred.password !== cred.repeatPassword) {
            setErr('Paaswords do not match');
            return;
        }

        if (!checked) {
            setErr('Please select the checkbox');
            return;
        }

        function failure() {
            setErr('Invalid details');
            setCred({
                ...cred,
                password: '',
                repeatPassword: ''
            });
            setLoading(false)
        }

        function success() {
            setErr('');
            setLoading(false);
            navigation.replace('App', {
                screen: 'Home'
            });
        }

        register(cred, success, failure);
    };

    return (
        <Container style={stylesCtm.container}>
            {
                // <Header>
                //         <Left>
                //           <Button transparent>
                //             <Icon name='arrow-back' />
                //           </Button>
                //         </Left>
                //         <Body>
                //           <Title>Header</Title>
                //         </Body>
                //       </Header>
            }
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Form style={styles.container}>
                        <Text style={styles.title}>Sign up</Text>
                        <Item inlineLabel style={{ marginBottom: 10 }}>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="name"
                                autoCompleteType="name"
                                blurOnSubmit={true}
                                clearButtonMode="while-editing"
                                keyboardType="default"
                                value={cred.name}
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
                                autoCompleteType="email"
                                blurOnSubmit={true}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                value={cred.email}
                                onChangeText={text =>
                                    handleChange(text, 'email')
                                }
                            />
                        </Item>
                        <Item inlineLabel style={{ marginBottom: 10 }}>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                name="password"
                                autoCompleteType="password"
                                blurOnSubmit={true}
                                clearButtonMode="while-editing"
                                keyboardType="default"
                                value={cred.password}
                                onChangeText={text =>
                                    handleChange(text, 'password')
                                }
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Repeat Password</Label>
                            <Input
                                secureTextEntry={true}
                                name="repeatPassword"
                                autoCompleteType="password"
                                blurOnSubmit={true}
                                clearButtonMode="while-editing"
                                keyboardType="default"
                                value={cred.repeatPassword}
                                onChangeText={text =>
                                    handleChange(text, 'repeatPassword')
                                }
                            />
                        </Item>
                        <View style={styles.checkbox}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                color="#f85f6a"
                                onPress={handleChecked}
                            />
                            <Text style={{ paddingLeft: 15 }}>
                                I agree to the terms of services
                            </Text>
                        </View>

                        <Button
                            primary
                            block
                            disabled={loading ? true : false}
                            style={stylesCtm.primaryBtn}
                            onPress={onSubmit}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={stylesCtm.buttonText}>
                                    Register
                                </Text>
                            )}
                        </Button>
                        <View style={stylesCtm.errMsg}>
                            <Text
                                style={{
                                    color: '#f85f6a',
                                    fontWeight: 'bold',
                                    marginBottom: 15
                                }}
                            >
                                {err}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        color: '#999',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text
                                        style={{
                                            color: '#f85f6a',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        &nbsp;Sign In
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Form>
                </ScrollView>
            </SafeAreaView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        paddingHorizontal: 15,
        marginVertical: 30,
        alignSelf: 'flex-start'
    },
    button: {
        backgroundColor: '#f85f6a',
        marginTop: 30,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 30,
        alignItems: 'center'
    }
});

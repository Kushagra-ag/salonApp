import React from 'react';
import { View, Text, BackHandler, ScrollView } from 'react-native';
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
    List,
    ListItem
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import stylesCtm from '../../../styles';

export default function Haircare({ navigation }) {
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
                    <Title>Nails</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <View>
                    <Text style={stylesCtm.heading}>
                        What kind of Nails treatment do you need today?
                    </Text>
                </View>
                <View style={{ paddingVertical: 20 }}>
                    <List>
                        <ListItem
                            thumbnail
                            onPress={() => navigation.navigate('Manicure')}
                        >
                            <Left>
                                <Thumbnail
                                    square
                                    source={require('../../../../assets/app/haircare.jpg')}
                                />
                            </Left>
                            <Body>
                                <Text style={stylesCtm.listItemBody}>
                                    {' '}
                                    Manicure{' '}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            thumbnail
                            onPress={() => navigation.navigate('Pedicure')}
                        >
                            <Left>
                                <Thumbnail
                                    square
                                    source={require('../../../../assets/app/haircare.jpg')}
                                />
                            </Left>
                            <Body>
                                <Text style={stylesCtm.listItemBody}>
                                    {' '}
                                    Pedicure{' '}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </View>
            </ScrollView>
        </React.Fragment>
    );
}

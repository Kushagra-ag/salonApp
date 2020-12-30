import React from 'react';
import {
    View,
    Text,
    Image,
    BackHandler,
    ScrollView,
    SafeAreaView
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
    List,
    ListItem
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import stylesCtm from '../../../styles';

export default function Haircare({ navigation }) {
    const back = () => {
        console.log('in back fn');
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
                    <Title>Haircare</Title>
                </Body>
                <Right />
            </Header>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Text style={stylesCtm.heading}>
                            What kind of Haircare do you need today?
                        </Text>
                    </View>
                    <View style={{ paddingVertical: 20 }}>
                        <List>
                            <ListItem
                                thumbnail
                                onPress={() => navigation.navigate('Haircut')}
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
                                        Haircut{' '}
                                    </Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem
                                thumbnail
                                onPress={() => navigation.navigate('Haircolor')}
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
                                        Hair Color{' '}
                                    </Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </React.Fragment>
    );
}

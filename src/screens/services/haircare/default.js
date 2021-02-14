import React from 'react';
import {
    View,
    Text,
    Image,
    BackHandler,
    ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
import stylesCtm from '../../../styles';

export default function Haircare({ navigation }) {

    useFocusEffect(
        React.useCallback(() => {
            // addServices([])
            BackHandler.addEventListener('hardwareBackPress', back);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', back);
            };
        }, [])
    );

    const back = () => {
        navigation.navigate('Services',{
            screen: 'Index'
        });
        return true;
    };
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
                <ScrollView keyboardShouldPersistTaps="handled">
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
        </React.Fragment>
    );
}

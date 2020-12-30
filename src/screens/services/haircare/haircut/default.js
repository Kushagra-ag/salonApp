import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
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
import stylesCtm from '../../../../styles';

export default function Haircut({ navigation }) {
    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Haircut</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <Text style={stylesCtm.heading}>
                    What kind of Haircut do you need today?
                </Text>
                <View style={{ paddingVertical: 20 }}>
                    <List>
                        <ListItem
                            thumbnail
                            onPress={() => navigation.navigate('Women')}
                        >
                            <Left>
                                <Thumbnail
                                    square
                                    source={require('../../../../../assets/app/haircare.jpg')}
                                />
                            </Left>
                            <Body>
                                <Text style={stylesCtm.listItem}>
                                    {' '}
                                    Womens' cut{' '}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            thumbnail
                            onPress={() => navigation.navigate('Men')}
                        >
                            <Left>
                                <Thumbnail
                                    square
                                    source={require('../../../../../assets/app/haircare.jpg')}
                                />
                            </Left>
                            <Body>
                                <Text style={stylesCtm.listItem}>
                                    {' '}
                                    Mens' cut{' '}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            thumbnail
                            onPress={() => navigation.navigate('Kids')}
                        >
                            <Left>
                                <Thumbnail
                                    square
                                    source={require('../../../../../assets/app/haircare.jpg')}
                                />
                            </Left>
                            <Body>
                                <Text style={stylesCtm.listItem}>
                                    {' '}
                                    Kids' cut{' '}
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

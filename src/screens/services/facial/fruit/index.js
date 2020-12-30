import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
import { alertBox, fetchProduct } from '../../../../methods/cartMethods.js';

export default function Haircolor({ navigation }) {
    const [services, addServices] = useState([]);

    const handleServices = res => addServices(services => [...services, res]);

    useEffect(() => {
        fetchProduct('5faa4f1ddfbd7a3ac1a1556d', handleServices);
        fetchProduct('5faa4ef8dfbd7a3ac1a1556c', handleServices);
    }, []);

    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Fruit Facial</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <Text style={stylesCtm.heading}>
                    What kind of Facial do you need today?
                </Text>
                <View style={{ paddingVertical: 20 }}>
                    <List>
                        {services.length > 0 &&
                            services.map(item =>
                                item ? (
                                    <ListItem
                                        thumbnail
                                        key={item._id}
                                        onPress={e =>
                                            alertBox(e, item._id, item.title)
                                        }
                                    >
                                        <Left>
                                            <Thumbnail
                                                square
                                                source={require('../../../../../assets/app/haircare.jpg')}
                                            />
                                        </Left>
                                        <Body>
                                            <Text
                                                style={stylesCtm.listItemBody}
                                            >
                                                {' '}
                                                {item.title}{' '}
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text> {`\$${item.price}`} </Text>
                                        </Right>
                                    </ListItem>
                                ) : null
                            )}
                    </List>
                </View>
            </ScrollView>
        </React.Fragment>
    );
}

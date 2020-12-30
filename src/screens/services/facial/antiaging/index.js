import React, { useEffect, useState } from 'react';
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
        fetchProduct('5faa4f39dfbd7a3ac1a1556e', handleServices);
        fetchProduct('5faa4f51dfbd7a3ac1a1556f', handleServices);
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
                    <Title>Anti Aging Facial</Title>
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
                                                source={{ uri: item.img }}
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

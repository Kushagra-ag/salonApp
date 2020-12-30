import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
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
import stylesCtm from '../../../../../styles';
import { alertBox, fetchProduct } from '../../../../../methods/cartMethods.js';
import serviceId from '../../../services.json';

export default function WomenHaircare({ navigation }) {
    const [services, addServices] = useState([]);

    const handleServices = res => addServices(services => [...services, res]);

    useEffect(() => {
        addServices([]);

        const {
            services: {
                haircare: {
                    haircut: { kids }
                }
            }
        } = serviceId;

        kids.forEach(id => fetchProduct(id, handleServices));
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
                    <Title>Kids Haircare</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <Text style={stylesCtm.heading}>
                    What kind of Kids haircut do you need today?
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
                                                {item.name}{' '}
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

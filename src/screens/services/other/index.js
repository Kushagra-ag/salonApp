import React, { useState, useEffect } from 'react';
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
import { alertBox, fetchProduct } from '../../../methods/cartMethods.js';
import serviceId from '../services.json';

export default function Haircolor({ navigation }) {
    const [services, addServices] = useState([]);

    const handleServices = res => addServices(services => [...services, res]);

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

    useEffect(() => {
        addServices([]);

        const {
            services: { other }
        } = serviceId;

        other.forEach(id => fetchProduct(id, handleServices));
    }, []);

    return (
        <React.Fragment>
            <Header>
                <Left>
                    <Button transparent onPress={back}>
                        <Icon name="arrow-back" style={{ fontSize: 24 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Other Services</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <Text style={stylesCtm.heading}>
                    What kind of Services do you need today?
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
                                                {item.name}
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

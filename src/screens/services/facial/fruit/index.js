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
import { AddToCartModal } from '../../../../components/modals.js';
import { fetchProduct } from '../../../../methods/cartMethods.js';
import serviceId from '../../services.json';

export default function Haircolor({ navigation }) {
    const [services, addServices] = useState([]);
    const [curService, setCurService] = useState({
        title: '',
        id: ''
    });
    const [visible, setVisible] = useState(false);

    const handleServices = res => addServices(services => [...services, res]);

    useEffect(() => {
        addServices([]);

        const {
            services: {
                facial: { fruit }
            }
        } = serviceId;

        fruit.forEach(id => fetchProduct(id, handleServices));
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
                <AddToCartModal
                    visible={visible}
                    setVisible={setVisible}
                    service={curService}
                />
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
                                        onPress={() => {
                                            setVisible(true);
                                            setCurService({
                                                title: item.title,
                                                id: item._id
                                            });
                                        }}
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

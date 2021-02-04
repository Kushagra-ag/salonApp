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
import CustomDialog from '../../../../../components/CustomDialog.js';
import { fetchProduct } from '../../../../../methods/cartMethods.js';
import serviceId from '../../../services.json';

export default function WomenHaircare({ navigation }) {
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
                haircare: {
                    haircut: { women }
                }
            }
        } = serviceId;

        women.forEach(id => fetchProduct(id, handleServices));
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
                    <Title>Women Haircare</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <CustomDialog
                    visible={visible}
                    setVisible={setVisible}
                    service={curService}
                />
                <Text style={stylesCtm.heading}>
                    What kind of Womens' haircut do you need today?
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

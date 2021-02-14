import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler,
    ScrollView,
    TextInput,
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
import { fetchProduct } from '../../../methods/cartMethods.js';
import { AddToCartModal } from '../../../components/modals.js';
import serviceId from '../services.json';

export default function Haircare({ navigation, route }) {
    const [services, addServices] = useState([]);
    const [curService, setCurService] = useState({
        title: '',
        id: ''
    });
    const [visible, setVisible] = useState(false);

    const handleServices = res => addServices(services => [...services, res]);

    useEffect(() => {
        addServices([]);
        console.log(route);

        const {
            services: { waxing }
        } = serviceId;

        waxing.forEach(id => fetchProduct(id, handleServices));
    }, []);

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
                    <Title>Waxing</Title>
                </Body>
                <Right />
            </Header>
            <ScrollView keyboardShouldPersistTaps="handled">
                <AddToCartModal
                    visible={visible}
                    setVisible={setVisible}
                    service={curService}
                />
                <Text style={stylesCtm.heading}>
                    What kind of Waxing do you need today?
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

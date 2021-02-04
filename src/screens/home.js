import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import {
    Col,
    Row,
    Grid,
    Header,
    Content,
    Form,
    Thumbnail,
    Item,
    Input,
    Left,
    Right,
    Label,
    Button,
    Icon,
    Body,
    Title,
    List,
    ListItem
} from 'native-base';
import {
    NavigationContainer,
    CommonActions,
    useFocusEffect
} from '@react-navigation/native';
import BottomNav from '../components/BottomNav.js';
import Login from './auth/login.js';
import Register from './auth/register.js';
import stylesCtm from '../styles';
import { alertBox } from '../methods/cartMethods.js';
import { searchService } from '../methods/miscMethods.js';

export default function Home({ navigation }) {
    const [view, setView] = useState(false);
    const [searchQuery, updateSearchQuery] = useState('');
    const [searchRes, updateSearchRes] = useState([]);

    const Drawer = createDrawerNavigator();

    const handleSearchResults = async hits => {
        await updateSearchRes([]);

        hits.forEach(item => {
            console.log('item - ', item);
            const obj = {
                // name: item.displayName,
                title: item.title,
                price: item.price,
                _id: item.objectID,
                img: item.image,
                description: item.description
            };
            updateSearchRes(searchRes => [...searchRes, obj]);
        });
    };

    const handleSearch = e => {
        updateSearchQuery(e.nativeEvent.text);

        if (Boolean(e.nativeEvent.text.trim()))
            searchService(e.nativeEvent.text, handleSearchResults);
    };

    useEffect(() => {
        return () => console.log('from home return');
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            console.log('from navigation usefocuseffect method');
        }, [])
    );

    return (
        <React.Fragment>
            <Header noLeft>
                <Left />
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right />
            </Header>
            
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={stylesCtm.heading}>
                            What can we help you with today?
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Item style={styles.search}>
                            <Icon active name="search" />
                            <Input
                                placeholder="Search services"
                                clearButtonMode="while-editing"
                                onChange={handleSearch}
                            />
                        </Item>
                    </View>
                    <View style={{ paddingVertical: 30 }}>
                        <List>
                            {searchQuery ? (
                                searchRes.length > 0 ? (
                                    searchRes.map(item => (
                                        <ListItem
                                            key={item._id}
                                            thumbnail
                                            onPress={e =>
                                                alertBox(
                                                    e,
                                                    item._id,
                                                    item.title
                                                )
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
                                                    style={
                                                        stylesCtm.listItemBody
                                                    }
                                                >
                                                    {item.title}
                                                </Text>
                                            </Body>
                                            <Right>
                                                <Text>
                                                    {' '}
                                                    {`\$${item.price}`}{' '}
                                                </Text>
                                            </Right>
                                        </ListItem>
                                    ))
                                ) : null
                            ) : (
                                <React.Fragment>
                                    <ListItem
                                        thumbnail
                                        onPress={() =>
                                            navigation.navigate('Services', {
                                                screen: 'Haircare'
                                            })
                                        }
                                    >
                                        <Left>
                                            <Thumbnail
                                                square
                                                source={require('../../assets/app/haircare.jpg')}
                                            />
                                        </Left>
                                        <Body>
                                            <Text
                                                style={stylesCtm.listItemBody}
                                            >
                                                Hair care
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <ListItem
                                        thumbnail
                                        onPress={() =>
                                            navigation.navigate('Services', {
                                                screen: 'Waxing'
                                            })
                                        }
                                    >
                                        <Left>
                                            <Thumbnail
                                                square
                                                source={require('../../assets/app/haircare.jpg')}
                                            />
                                        </Left>
                                        <Body>
                                            <Text
                                                style={stylesCtm.listItemBody}
                                            >
                                                Waxing
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <ListItem
                                        thumbnail
                                        onPress={() =>
                                            navigation.navigate('Services', {
                                                screen: 'Threading'
                                            })
                                        }
                                    >
                                        <Left>
                                            <Thumbnail
                                                square
                                                source={require('../../assets/app/haircare.jpg')}
                                            />
                                        </Left>
                                        <Body>
                                            <Text
                                                style={stylesCtm.listItemBody}
                                            >
                                                Threading
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </React.Fragment>
                            )}
                        </List>
                    </View>
                    {Boolean(!searchQuery) && (
                        <View style={{ paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Services', {
                                screen: "Index"
                            })}>
                                <Text
                                    style={{
                                        color: '#999',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    View all
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View>
                        <Text style={stylesCtm.heading}>Trending now </Text>
                    </View>
                    <Grid style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
                        <Row>
                            <Col
                                style={{ marginRight: 20, overflow: 'hidden' }}
                                onPress={() =>
                                    navigation.navigate('Services', {
                                        screen: 'Haircare',
                                        params: {
                                            screen: 'Haircut'
                                        }
                                    })
                                }
                            >
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/app/haircutmen.jpg')}
                                />
                                <Text>Boys haircut 2020</Text>
                            </Col>
                            <Col
                                style={{ marginLeft: 20, overflow: 'hidden' }}
                                onPress={() =>
                                    navigation.navigate('Services', {
                                        screen: 'Haircare',
                                        params: {
                                            screen: 'Index'
                                        }
                                    })
                                }
                            >
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/app/haircutwomen.jpg')}
                                />
                                <Text>Hairstyle 2020</Text>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
                <BottomNav />
            
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: 20,
        backgroundColor: '#e8e8e8',
        borderRadius: 10
    },
    image: {
        width: 'auto',
        height: 100
    }
});

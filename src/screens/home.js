import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions
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

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
    const [view, setView] = useState(false);
    const [searchQuery, updateSearchQuery] = useState('');
    const [searchRes, updateSearchRes] = useState([]);

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
                                                {item.title}
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text> {`\$${item.price}`} </Text>
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
                                        <Text style={stylesCtm.listItemBody}>
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
                                        <Text style={stylesCtm.listItemBody}>
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
                                        <Text style={stylesCtm.listItemBody}>
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
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Services', {
                                    screen: 'Index'
                                })
                            }
                        >
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

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontallScrollContainer}
                >
                    <TouchableOpacity
                        style={styles.imgContainer}
                        onPress={() => {
                            console.log('presss');
                            navigation.navigate('Services', {
                                screen: 'Haircare',
                                params: {
                                    screen: 'Haircut'
                                }
                            });
                        }}
                    >
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={require('../../assets/app/haircutmen.jpg')}
                        />
                        <Text>Boys haircut 2020</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imgContainer}
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
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imgContainer}
                        onPress={() => {
                            console.log('presss');
                            navigation.navigate('Services', {
                                screen: 'Haircare',
                                params: {
                                    screen: 'Haircut'
                                }
                            });
                        }}
                    >
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={require('../../assets/app/haircutmen.jpg')}
                        />
                        <Text>Boys haircut 2020</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imgContainer}
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
                    </TouchableOpacity>
                </ScrollView>
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
    horizontallScrollContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 50,
        backgroundColor: '#e8e8e8'
    },
    imgContainer: {
        overflow: 'hidden',
        width: 0.55 * width,
        height: 150,
        marginRight: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderColor: '#fff',
        borderWidth: 5,
        marginBottom: 10
    }
});

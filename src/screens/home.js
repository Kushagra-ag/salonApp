import React, { useState, useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
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
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/HomeCarouselCard.js';
import data from '../data/homeCarouselData.js';
import BottomNav from '../components/BottomNav.js';
import { AddToCartModal } from '../components/modals.js';
import Login from './auth/login.js';
import Register from './auth/register.js';
import stylesCtm from '../styles';
import { searchService } from '../methods/miscMethods.js';

const { width, height } = Dimensions.get('window');

const CarouselHome = () => {
  const isCarousel = React.useRef(null)

  return (
    <View style={styles.carouselHome}>
        <Text style={{...stylesCtm.heading, marginTop: 0, marginBottom: 15,}}>Trending now </Text>
      <Carousel
        layout="stack"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  )
}

export default function Home({ navigation }) {
    const [view, setView] = useState(false);
    const [searchQuery, updateSearchQuery] = useState('');
    const [searchRes, updateSearchRes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [curService, setCurService] = useState({});

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

            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <AddToCartModal
                    visible={visible}
                    setVisible={setVisible}
                    service={curService}
                />
                <View>
                    <Text style={stylesCtm.heading}>
                        What can we help you with today?
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
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
                                        onPress={e => {
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
                                                {item.title}
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text style={{ fontWeight: 'bold' }}> {`\$${item.price}`} </Text>
                                        </Right>
                                    </ListItem>
                                ))
                            ) : (
                                <ActivityIndicator size="small" color="#000" />
                            )
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
                        <Pressable
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
                        </Pressable>
                    </View>
                )}
                <View>
                    
                </View>

                {
                    // <ScrollView
                    //                 horizontal={true}
                    //                 showsHorizontalScrollIndicator={false}
                    //                 style={styles.horizontallScrollContainer}
                    //             >
                    //                 <Pressable
                    //                     style={styles.imgContainer}
                    //                     onPress={() => {
                    //                         console.log('presss');
                    //                         navigation.navigate('Services', {
                    //                             screen: 'Haircare',
                    //                             params: {
                    //                                 screen: 'Haircut'
                    //                             }
                    //                         });
                    //                     }}
                    //                 >
                    //                     <Image
                    //                         style={styles.image}
                    //                         resizeMode="cover"
                    //                         source={require('../../assets/app/haircutmen.jpg')}
                    //                     />
                    //                     <Text>Boys haircut 2020</Text>
                    //                 </Pressable>
                    //                 <Pressable
                    //                     style={styles.imgContainer}
                    //                     onPress={() =>
                    //                         navigation.navigate('Services', {
                    //                             screen: 'Haircare',
                    //                             params: {
                    //                                 screen: 'Index'
                    //                             }
                    //                         })
                    //                     }
                    //                 >
                    //                     <Image
                    //                         style={styles.image}
                    //                         source={require('../../assets/app/haircutwomen.jpg')}
                    //                     />
                    //                     <Text>Hairstyle 2020</Text>
                    //                 </Pressable>
                
                    //                 <Pressable
                    //                     style={styles.imgContainer}
                    //                     onPress={() => {
                    //                         console.log('presss');
                    //                         navigation.navigate('Services', {
                    //                             screen: 'Haircare',
                    //                             params: {
                    //                                 screen: 'Haircut'
                    //                             }
                    //                         });
                    //                     }}
                    //                 >
                    //                     <Image
                    //                         style={styles.image}
                    //                         resizeMode="cover"
                    //                         source={require('../../assets/app/haircutmen.jpg')}
                    //                     />
                    //                     <Text>Boys haircut 2020</Text>
                    //                 </Pressable>
                    //                 <Pressable
                    //                     style={styles.imgContainer}
                    //                     onPress={() =>
                    //                         navigation.navigate('Services', {
                    //                             screen: 'Haircare',
                    //                             params: {
                    //                                 screen: 'Index'
                    //                             }
                    //                         })
                    //                     }
                    //                 >
                    //                     <Image
                    //                         style={styles.image}
                    //                         source={require('../../assets/app/haircutwomen.jpg')}
                    //                     />
                    //                     <Text>Hairstyle 2020</Text>
                    //                 </Pressable>
                    //             </ScrollView>
                            }
                <CarouselHome />
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
    carouselHome: {
        // paddingHorizontal: 20,
        marginTop: 30, 
        paddingVertical: 15,
        paddingBottom: 20,
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

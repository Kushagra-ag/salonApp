import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	BackHandler,
	ScrollView,
	TextInput
} from 'react-native';
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
import stylesCtm from '../../styles';
import serviceId from './services.json';

export default function Default({ navigation }) {

	const [services, addServices] = useState([]);

	useEffect(() => {
		addServices([])
		for(let ser in serviceId.services) {
			addServices(services => [...services, ser])
		}
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
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
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
					<Title>Services</Title>
				</Body>
				<Right />
			</Header>
				<ScrollView>
					<Text style={stylesCtm.heading}>
						Select the type of service you want
					</Text>
					<View style={{ paddingVertical: 20 }}>

						<List>
	                        {services.length > 0 &&
	                            services.map((item, idx) =>
	                                item ? (
	                                    <ListItem
	                                        thumbnail
	                                        key={idx}
	                                        onPress={() => {
	                                            navigation.navigate('Services', {
	                                            	screen: `${item[0].toUpperCase()}${item.slice(1)}`
	                                            });
	                                        }}
	                                    >
	                                        <Left>
	                                            <Thumbnail
	                                                square
	                                                source={require('../../../assets/app/default.jpg')}
	                                            />
	                                        </Left>
	                                        <Body>
	                                            <Text
	                                                style={stylesCtm.listItemBody}
	                                            >
	                                                {`${item[0].toUpperCase()}${item.slice(1)}`}
	                                            </Text>
	                                        </Body>
	                                        <Right>
	                                            
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

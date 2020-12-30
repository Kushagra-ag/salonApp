import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import OrderDetails from './orderDetails.js';
import BottomNav from '../../components/BottomNav.js';

const serviceStack = createStackNavigator();

function myStack({ navigation }) {
    return (
        <React.Fragment>
            <serviceStack.Navigator initialRouteName="Index" headerMode="none">
                <serviceStack.Screen name="Index" component={Default} />
                <serviceStack.Screen
                    name="OrderDetails"
                    component={OrderDetails}
                />
            </serviceStack.Navigator>
            <BottomNav navigation={navigation} />
        </React.Fragment>
    );
}

export default myStack;

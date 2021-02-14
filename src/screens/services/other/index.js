import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';

const otherServices = createStackNavigator();

function myStack() {
    return (
        <otherServices.Navigator headerMode="none" initialRouteName="Index">
            <otherServices.Screen name="Index" component={Default} />
        </otherServices.Navigator>
    );
}

export default myStack;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';

const waxing = createStackNavigator();

function myStack() {
    return (
        <waxing.Navigator headerMode="none" initialRouteName="Index">
            <waxing.Screen name="Index" component={Default} />
        </waxing.Navigator>
    );
}

export default myStack;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';

const threading = createStackNavigator();

function myStack() {
    return (
        <threading.Navigator headerMode="none" initialRouteName="Index">
            <threading.Screen name="Index" component={Default} />
        </threading.Navigator>
    );
}

export default myStack;

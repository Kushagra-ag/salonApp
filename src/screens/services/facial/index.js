import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import Regular from './regular/index.js';
import Fruit from './fruit/index.js';
import AntiAging from './antiaging/index.js';

const facialStack = createStackNavigator();

function myStack() {
    return (
        <facialStack.Navigator headerMode="none" initialRouteName="Index">
            <facialStack.Screen name="Index" component={Default} />
            <facialStack.Screen name="Regular" component={Regular} />
            <facialStack.Screen name="Fruit" component={Fruit} />
            <facialStack.Screen name="AntiAging" component={AntiAging} />
        </facialStack.Navigator>
    );
}

export default myStack;

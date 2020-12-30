import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import Haircut from './haircut/index.js';
import Haircolor from './haircolor/index.js';

const haircareStack = createStackNavigator();

function myStack() {
    return (
        <haircareStack.Navigator headerMode="none" initialRouteName="Index">
            <haircareStack.Screen name="Index" component={Default} />
            <haircareStack.Screen name="Haircut" component={Haircut} />
            <haircareStack.Screen name="Haircolor" component={Haircolor} />
        </haircareStack.Navigator>
    );
}

export default myStack;

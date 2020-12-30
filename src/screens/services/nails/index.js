import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import Manicure from './manicure/index.js';
import Pedicure from './pedicure/index.js';

const nailStack = createStackNavigator();

function myStack() {
    return (
        <nailStack.Navigator headerMode="none" initialRouteName="Index">
            <nailStack.Screen name="Index" component={Default} />
            <nailStack.Screen name="Manicure" component={Manicure} />
            <nailStack.Screen name="Pedicure" component={Pedicure} />
        </nailStack.Navigator>
    );
}

export default myStack;

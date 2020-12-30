import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import Women from './women/index.js';
import Kids from './kids/index.js';
import Men from './men/index.js';

const haircutStack = createStackNavigator();

function myStack() {
    return (
        <haircutStack.Navigator headerMode="none" initialRouteName="Index">
            <haircutStack.Screen name="Index" component={Default} />
            <haircutStack.Screen name="Women" component={Women} />
            <haircutStack.Screen name="Men" component={Men} />
            <haircutStack.Screen name="Kids" component={Kids} />
        </haircutStack.Navigator>
    );
}

export default myStack;

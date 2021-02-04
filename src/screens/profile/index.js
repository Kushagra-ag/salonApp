import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import setPassword from './setPassword.js';
import BottomNav from '../../components/BottomNav.js';

const profileStack = createStackNavigator();

function myStack({ navigation }) {
    return (
        <React.Fragment>
            <profileStack.Navigator initialRouteName="Index" headerMode="none">
                <profileStack.Screen name="Index" component={Default} />
                <profileStack.Screen name="Password" component={setPassword} />
            </profileStack.Navigator>
            <BottomNav />
        </React.Fragment>
    );
}

export default myStack;

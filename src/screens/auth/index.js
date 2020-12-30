import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login.js';
import Register from './register.js';

const authStack = createStackNavigator();

function myStack() {
    return (
        <authStack.Navigator headerMode="none" initialRouteName="Login">
            <authStack.Screen name="Register" component={Register} />
            <authStack.Screen name="Login" component={Login} />
        </authStack.Navigator>
    );
}

export default myStack;

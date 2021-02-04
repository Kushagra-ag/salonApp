import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import Haircare from './haircare';
import Waxing from './waxing';
import Threading from './threading';
import Facial from './facial';
import Nails from './nails';
import Other from './other';
import BottomNav from '../../components/BottomNav.js';

const serviceStack = createStackNavigator();

function myStack({ navigation }) {
    return (
        <React.Fragment>
            <serviceStack.Navigator headerMode="none" initialRouteName="Index">
                <serviceStack.Screen name="Index" component={Default} />
                <serviceStack.Screen name="Haircare" component={Haircare} />
                <serviceStack.Screen name="Waxing" component={Waxing} />
                <serviceStack.Screen name="Threading" component={Threading} />
                <serviceStack.Screen name="Facial" component={Facial} />
                <serviceStack.Screen name="Nails" component={Nails} />
                <serviceStack.Screen name="Other" component={Other} />
            </serviceStack.Navigator>
            <BottomNav />
        </React.Fragment>
    );
}

export default myStack;

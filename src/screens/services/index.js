import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Haircare from './haircare/index.js';
import Waxing from './waxing/index.js';
import Threading from './threading/index.js';
import Facial from './facial/index.js';
import Nails from './nails/index.js';
import Other from './other/index.js';
import BottomNav from '../../components/BottomNav.js';

const serviceStack = createStackNavigator();

function myStack({ navigation }) {
    return (
        <React.Fragment>
            <serviceStack.Navigator headerMode="none">
                <serviceStack.Screen name="Haircare" component={Haircare} />
                <serviceStack.Screen name="Waxing" component={Waxing} />
                <serviceStack.Screen name="Threading" component={Threading} />
                <serviceStack.Screen name="Facial" component={Facial} />
                <serviceStack.Screen name="Nails" component={Nails} />
                <serviceStack.Screen name="Other" component={Other} />
            </serviceStack.Navigator>
            <BottomNav navigation={navigation} />
        </React.Fragment>
    );
}

export default myStack;

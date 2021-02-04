import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './default.js';
import WaitScreen from './waitScreen.js';
import RouteMap from './routeMap.js';

const trackingStack = createStackNavigator();

function myStack({ navigation }) {
    return (
        <React.Fragment>
            <trackingStack.Navigator initialRouteName="Index" headerMode="none">
                <trackingStack.Screen name="Index" component={Default} />
                <trackingStack.Screen name="WaitScreen" component={WaitScreen} />
                <trackingStack.Screen name="RouteMap" component={RouteMap} />
            </trackingStack.Navigator>
        </React.Fragment>
    );
}

export default myStack;
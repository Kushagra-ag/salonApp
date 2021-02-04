import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { registerForPushNotificationsAsync } from './notifMethods.js';
import { API } from './config.js';

const options = {
    'content-type': 'application/json'
};

export const profileCheck = async () => {
    try {
        // await AsyncStorage.removeItem('@e_beauty__acc');
        let profile = await AsyncStorage.getItem('@e_beauty__acc');

        if (profile) {
            profile = await JSON.parse(profile);
            return profile;
        }

        return null;
    } catch (e) {
        return null;
    }
};

export const login = async (data, success, failure) => {
    const token = await registerForPushNotificationsAsync();
    console.log("token - ", token);
    
    data = { ...data, notificationId: token };
    try {
        axios
            .post(`${API}accounts/login`, data, {
                headers: options
            })
            .then(res => {
                console.log(res.data);

                if (res.data.success && !res.data.user.isSeller) {
                    AsyncStorage.setItem(
                        '@e_beauty__acc',
                        JSON.stringify(res.data)
                    );
                    success();
                } else {
                    console.log('Auth failed');
                    failure();
                }
            })
            .catch(err => {
                failure(err);
                console.log('error - ', JSON.stringify(err));
            });
    } catch (e) {
        return null;
    }
};

export const register = async (data, success, failure) => {
    try {
        const token = await registerForPushNotificationsAsync();
        data = { ...data, notificationId: token };

        console.log('from register method - ', data);

        axios
            .post(`${API}accounts/signup`, data, {
                headers: options
            })
            .then(res => {
                console.log(res.data);

                if (res.data.success) {
                    AsyncStorage.setItem(
                        '@e_beauty__acc',
                        JSON.stringify(res.data)
                    );
                    success();
                } else {
                    console.log('Auth failed');
                    failure();
                }
            })
            .catch(err => {
                console.log('error - ', err);
            });
    } catch (e) {
        return null;
    }
};

export const logout = async next => {
    try {
        console.log('in logout method');

        const { token } = await profileCheck();

        await AsyncStorage.removeItem('@e_beauty__acc');
        
        clearNotificationToken(token, next);

        // next();
    } catch (e) {
        console.log(e);
    }
};

export const clearNotificationToken = (token, next) => {
    
    console.log('in clearNotificationToken method')
    axios
        .post(`${API}accounts/clearnotification`, null, {
                headers: {
                    ...options,
                    'authorization': token
                }
            })
            .then(res => {
                next();
            })
            .catch(e => {
                console.log(e)
                return null
            })


};

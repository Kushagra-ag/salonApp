import { createRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { registerForPushNotificationsAsync } from './notifMethods.js';
import { API } from './config.js';

export const navigationRef = createRef();

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
        console.log('erratic', profile)
        return null
    } catch (e) {
        return logout();
    }
};

export const login = async (data, success, failure) => {
    const token = await registerForPushNotificationsAsync();
    console.log('token - ', token);

    data = { ...data, notificationId: token };
    console.log(data);
    
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
                console.log('error - ', JSON.stringify(err.response.data));
            });
    
};

export const register = async (data, success, failure) => {
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

};

export const logout = async () => {
    try {
        console.log('in logout method');

        if (AsyncStorage.getItem('@e_beauty__acc')) {
            const { token } = await profileCheck();

            await AsyncStorage.removeItem('@e_beauty__acc');

            clearNotificationToken(token);
        } else resetToAuth()

        // next();
    } catch (e) {
        console.log(e);
    }
};

export const clearNotificationToken = async token => {
    console.log('in clearNotificationToken method');
    axios
        .post(`${API}accounts/clearnotification`, null, {
            headers: {
                ...options,
                authorization: token
            }
        })
        .then(res => {
            resetToAuth();
            return null;
        })
        .catch(e => {
            console.log(e);
            return null;
        });
};

export const resetToAuth = () => {console.log('in resettoauth')
    navigationRef.current?.reset({
        index: 0,
        routes: [
            {
                name: 'Auth',
                params: {
                    screen: 'Login',
                    message: 'Your session expired. Please login to continue'
                }
            }
        ]
    });
};

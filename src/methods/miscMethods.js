import axios from 'axios';
import { API } from './config.js';
import { profileCheck, logout } from './authMethods.js';

const options = {
    'content-type': 'application/json'
};

export const payment = async (paymentResponse, cart, setWebPage) => {
    console.log('Please wait while confirming your payment!');

    let jsonResponse = JSON.parse(paymentResponse);

    const profile = await profileCheck();
    const {
        user: { email }
    } = profile;

    const data = {
        cart,
        email,
        authToken: jsonResponse
    };

    axios
        .post(`${API}payment`, data, {
            headers: options
        })
        .then(res => {
            console.log('after axios response - ', res.data.response);

            if (res.data) {
                const { paid } = res.data.response;
                if (paid === true) {
                    console.log('Payment Success');
                    setWebPage('success');
                } else {
                    console.log('Payment failed due to some issue1');
                    setWebPage('failure');
                }
            } else {
                console.log(' Payment failed due to some issue2');
                setWebPage('failure');
            }
        })
        .catch(err => {
            console.log(' Payment failed due to some issue3');
            setWebPage('failure');
            console.log(err);
        });
};

export const placeOrder = async (data, success) => {
    data = JSON.stringify(data);
    console.log('frm placeorder fn- ', data);
    // data = JSON.stringify(data);

    const { token } = await profileCheck();

    // axios
    //     .post(`${API}seller/notifybeautician`,
    //         data,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token
    //             }
    //         }
    //     )
    //     .then(res => {
    //         console.log('assds',res.data)
    //         success(res.data);
    //     })
    //     .catch(err => {
    //         console.log('failed', err)
    //     })

    let config = {
        method: 'post',
        url: `${API}seller/notifybeautician`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        data: data
    };

    axios(config)
        .then(function (res) {
            console.log('aaaaaaaa', res.data);
            if (res.data.authError) return logout();
            
            success(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const orderStatus = async (data, success) => {
    console.log('in order status method');

    const { token } = await profileCheck();
    console.log('data', JSON.stringify(data));

    let config = {
        method: 'post',
        url: `${API}orderStatus`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        data: JSON.stringify(data)
    };

    axios(config)
        .then(function (res) {
            console.log('aaaabbb', res.data);
            // return res.data
            if (res.data.authError) return logout();

            success(res.data);
        })
        .catch(function (error) {
            console.log('err1', error);
        });
};

export const getOrder = async (id, success, failure) => {
    const { token } = await profileCheck();

    axios
        .get(`${API}accounts/orders/${id}`, {
            headers: {
                ...options,
                Authorization: token
            }
        })
        .then(res => {

            if (res.data.authError) return logout();

            if (res.data.success) {
                const cart = res.data.order.products;
                console.log('from getordeR', res.data);

                success(cart, res.data.order.totalPrice);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const getOrders = async handleOrders => {
    const { token } = await profileCheck();

    axios
        .get(`${API}accounts/orders`, {
            headers: {
                ...options,
                Authorization: token
            }
        })
        .then(res => {
            console.log('ssss', res.data);

            if (res.data.authError) return logout();

            if (res.data.success) {
                res.data.orders.forEach(order => {
                    handleOrders(order);
                });
                return;
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const searchService = (str, next) => {
    axios
        .get(`${API}search?query=${str}`, {
            headers: options
        })
        .then(res => {
            const hits = res.data.content.hits.slice(0, 6);
            next(hits);
        })
        .catch(e => {
            console.log(e);
        });
};

export const getProfile = token => {
    return null;
};

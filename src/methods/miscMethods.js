import axios from 'axios';
import { API } from './config.js';

const options = {
    'content-type': 'application/json'
};

// export const paymentIntent = (next) => {
// 	axios
// 		.post(`${API}payment`, {
// 			header: options
// 		})
// 		.then(res => {
// 			console.log('res', res.data.client_secret);
// 			next(res.data.client_secret)
// 			// return res.data.client_secret
// 		})
// 		.catch(e => {
// 			console.log(e)
// 		})
// }

export const searchService = (str, next) => {
    axios
        .get(`${API}search?query=${str}`, {
            header: options
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

export const clearNotificationToken = token => {
    return null;
};

'use strict';

const firebaseApi = require('./firebaseApi');

const apiKeys = () => {
    return new Promise((resolve, reject) => {
        $.ajax('./db/apiKeys.json').done((data) => {
            resolve(data.firebaseKeys);
        }).fail((error) => {
            reject(error);
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {
        firebaseApi.setKey(results);
        firebase.initializeApp(results);
        firebaseApi.functioningRides();
    }).catch((error) => {
        console.log('error in retrieve keys', error);
    });
};

module.exports = {retrieveKeys};
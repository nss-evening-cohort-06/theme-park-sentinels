'use strict';
const firebaseApi = require('./firebaseApi');

const googleAuth = () => {
    $('#googleauth').click((e) => {
        firebaseApi.authenticateGoogle().then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log("error in authenticate google", error);
        });
    });
};

const init = () => {
    googleAuth();
};

module.exports = {init};
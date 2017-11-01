'use strict';

let firebaseKey = '';
let userUid = '';

const setKey = (key) => {
    firebaseKey = key;
};

let authenticateGoogle = () => {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
            userUid = authData.user.uid;
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };

  module.exports = {setKey, authenticateGoogle};
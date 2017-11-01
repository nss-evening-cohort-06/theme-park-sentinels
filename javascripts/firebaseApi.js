'use strict';

let firebaseKey = '';
let userUid = '';
let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];

const setKey = (key) => {
    firebaseKey = key;
};

// let authenticateGoogle = () => {
//     return new Promise((resolve, reject) => {
//       var provider = new firebase.auth.GoogleAuthProvider();
//       firebase.auth().signInWithPopup(provider)
//         .then((authData) => {
//             userUid = authData.user.uid;
//             resolve(authData.user);
//             dataGetter();
//         }).catch((error) => {
//             reject(error);
//         });
//     });
//   };

const getParkAreas = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/areas.json`).then((areas) => {
            if (areas != null) {
                Object.keys(areas).forEach((key) => {
                    areas[key].id = key;
                    parkAreas.push(areas[key]);
                });
            }
            resolve(parkAreas);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkAttractions = () => {
    parkAttractions = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json`).then((attractions) => {
            if (attractions != null) {
                Object.keys(attractions).forEach((key) => {
                    attractions[key].id = key;
                    parkAttractions.push(attractions[key]);
                });
            }
            resolve(parkAttractions);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkAttractionTypes = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).then((types) => {
            if (types != null) {
                Object.keys(types).forEach((key) => {
                    types[key].id = key;
                    parkAttractionTypes.push(types[key]);
                });
            }
            resolve(parkAreas);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkInfo = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((info) => {
            if (info != null) {
                Object.keys(info).forEach((key) => {
                    info[key].id = key;
                    parkInfo.push(info[key]);
                });
            }
            resolve(parkAreas);
        }).catch((error) => {
            reject(error);
        });
    });
};



const dataGetter = () => {
    getParkAreas().then((results) => {
       return getParkAttractions();
    }).then(() => {
        getParkAttractions().then((results) => {
            return getParkAttractionTypes();
        });
    }).then(() => {
        getParkInfo().then((results) => {
            console.log("parkAreas", parkAreas);
            console.log("parkAttractions", parkAttractions);
            console.log("parkAttractionTypes", parkAttractionTypes);
            console.log("parkInfo", parkInfo); 
        });
    });   
};


  module.exports = {setKey, dataGetter};
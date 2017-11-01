'use strict';

const data = require('./data');

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
                    areas[key].fbkey = key;
                    parkAreas.push(areas[key]);
                });
            }
            resolve(parkAreas);
        }).fail((error) => {
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
                    attractions[key].fbkey = key;
                    parkAttractions.push(attractions[key]);
                });
            }
            resolve(parkAttractions);
        }).fail((error) => {
            reject(error);
        });
    });
};

const getParkAttractionTypes = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).then((types) => {
            if (types != null) {
                Object.keys(types).forEach((key) => {
                    types[key].fbkey = key;
                    parkAttractionTypes.push(types[key]);
                });
            }
            resolve(parkAreas);
        }).fail((error) => {
            reject(error);
        });
    });
};

const getParkInfo = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((info) => {
            if (info != null) {
                Object.keys(info).forEach((key) => {
                    info[key].fbkey = key;
                    parkInfo.push(info[key]);
                });
            }
            resolve(parkAreas);
        }).fail((error) => {
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
            // console.log("parkAreas", parkAreas);
            // console.log("parkAttractions", parkAttractions);
            // console.log("parkAttractionTypes", parkAttractionTypes);
            // console.log("parkInfo", parkInfo); 
            data.smashThisShitTogether( parkAreas, parkAttractions );                                    
        });                
    });               
};

const getParkAreasData = () => {
    return parkAreas;
};

const getParkAttractionsData = () => {
    return parkAttractions;
};

const getParkAttractionTypesData = () => {
    return parkAttractionTypes;
};

const getParkInfoData = () => {
    return parkInfo;
};

  module.exports = {setKey, dataGetter, getParkAreasData, getParkAttractionsData, getParkAttractionTypesData, getParkInfoData};
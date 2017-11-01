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
    let parkData = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/areas.json`).then((areas) => {
            if (areas != null) {
                Object.keys(areas).forEach((key) => {
                    areas[key].id = key;
                    parkData.push(areas[key]);
                });
            }
            resolve(parkData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkAttractions = () => {
    let attractionData = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json`).then((attractions) => {
            if (attractions != null) {
                Object.keys(attractions).forEach((key) => {
                    attractions[key].id = key;
                    attractionData.push(attractions[key]);
                });
            }
            resolve(attractionData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkAttractionTypes = () => {
    let typeData = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).then((types) => {
            if (types != null) {
                Object.keys(types).forEach((key) => {
                    types[key].id = key;
                    typeData.push(types[key]);
                });
            }
            resolve(typeData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkInfo = () => {
    let parkData = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((info) => {
            if (info != null) {
                Object.keys(info).forEach((key) => {
                    info[key].id = key;
                    parkData.push(info[key]);
                });
            }
            resolve(parkData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const dataGetter = () => {
    getParkAttractions().then((results) => {
        results.forEach((result) => {
            parkAttractions.push(result);
        });
       return getParkAreas();
    }).then(() => {
        getParkAreas().then((results) => {
            results.forEach((result) => {
                parkAreas.push(result);
            });
            return getParkAttractionTypes();
        });
    }).then(() => {
        getParkAttractionTypes().then((results) => {
            results.forEach((result) => {
                parkAttractionTypes.push(result);
            });
            return getParkInfo();
        });
    }).then(() => {
        getParkInfo().then((results) => {
            results.forEach((result) => {
                parkInfo.push(result);
            });
            console.log("parkAreas", parkAreas);
            console.log("parkAttractions", parkAttractions);
            console.log("parkAttractionTypes", parkAttractionTypes);
            console.log("parkInfo", parkInfo); 
        });
        
    });  
};




  module.exports = {setKey, dataGetter};
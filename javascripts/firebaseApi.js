'use strict';

let firebaseKey = '';
let userUid = '';
let attractionData = [];
let maintenanceTickets = [];
const data = require('./data');
const moment = require('../lib/node_modules/moment/moment.js');


const setKey = (key) => {
    firebaseKey = key;
};

const updateMaintenance = () => {
    
    let smashedData = [];
    return new Promise ((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json`).then((attractions) => {
            if (attractions != null) {
                Object.keys(attractions).forEach((key) => {
                    attractions[key].fbId = key;
                    attractionData.push(attractions[key]);
                });
            }
            $.ajax(`${firebaseKey.databaseURL}/maintenance_tickets.json`).then((tickets) => {
                if (tickets != null) {
                    Object.keys(tickets).forEach((key) => {
                        tickets[key].fbId = key;
                        maintenanceTickets.push(tickets[key]);
                    });

                    // maintenanceTickets maintenanceDate
                    let attractionMaintenanceData = [];
                        attractionData.forEach(( attraction ) => {
                        maintenanceTickets.forEach(( maintenanceDate ) => {
                            if ( maintenanceDate.attraction_id === attraction.id ) {
                                attraction.maintenance_date  = maintenanceDate.maintenance_date;
                                attraction.maintenance_duration_hours = maintenanceDate.maintenance_duration;
                                smashedData.push(attraction);
                            }
                        });
                    });
                    
                    let brokenAttractions = outOfOrderAttractions(smashedData);
                    resolve(brokenAttractions);            
                }
            }).catch((error) => {
                reject(error);
            });
            
            // console.log(maintenanceTickets);
            // console.log(attractionData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const outOfOrderAttractions = (attractions) => {
    let workingStuff = [];
    // console.log(attractions);
    let currentTime = moment().unix();
    attractions.forEach(( attraction, i ) => {
        let maintenanceStartTime = moment(attraction.maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').unix();        
        let maintenanceDuration = attraction.maintenance_duration_hours;        
        if ( currentTime > maintenanceStartTime + maintenanceDuration || currentTime < maintenanceStartTime ) {
            workingStuff.push(attraction);        
            // firebaseApi.updateAttractionMaintenance( updatedAttraction, index );
            // console.log('current time is greater then that shit', maintenanceStartTime);            
        } 
    });
    // console.log('THIS SHIT WORKS', workingStuff);
    return workingStuff.unique('id');
};


// const getParkAreas = () => {
//     let parkData = [];
//     return new Promise((resolve, reject) => {
//         $.ajax(`${firebaseKey.databaseURL}/areas.json`).then((areas) => {
//             if (areas != null) {
//                 Object.keys(areas).forEach((key) => {
//                     areas[key].id = key;
//                     parkData.push(areas[key]);
//                 });
//             }
//             resolve(parkData);
//         }).catch((error) => {
//             reject(error);
//         });
//     });
// };

// const getParkAttractions = () => {
//     let attractionData = [];
//     return new Promise((resolve, reject) => {
//         $.ajax(`${firebaseKey.databaseURL}/attractions.json`).then((attractions) => {
//             if (attractions != null) {
//                 Object.keys(attractions).forEach((key) => {
//                     attractions[key].id = key;
//                     attractionData.push(attractions[key]);
//                 });
//             }
//             resolve(attractionData);
//         }).catch((error) => {
//             reject(error);
//         });
//     });
// };

// const getParkAttractionTypes = () => {
//     let typeData = [];
//     return new Promise((resolve, reject) => {
//         $.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).then((types) => {
//             if (types != null) {
//                 Object.keys(types).forEach((key) => {
//                     types[key].id = key;
//                     typeData.push(types[key]);
//                 });
//             }
//             resolve(typeData);
//         }).catch((error) => {
//             reject(error);
//         });
//     });
// };

// const getParkInfo = () => {
//     let parkData = [];
//     return new Promise((resolve, reject) => {
//         $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((info) => {
//             if (info != null) {
//                 Object.keys(info).forEach((key) => {
//                     info[key].id = key;
//                     parkData.push(info[key]);
//                 });
//             }
//             resolve(parkData);
//         }).catch((error) => {
//             reject(error);
//         });
//     });
// };

// const dataGetter = () => {
//     getParkAttractions().then((results) => {
//         data.setParkAttractions(results);
//        return getParkAreas();
//     }).then(() => {
//         getParkAreas().then((results) => {
//             data.setParkAreas(results);
//             return getParkAttractionTypes();
//         });
//     }).then(() => {
//         getParkAttractionTypes().then((results) => {
//             data.setParkAttractionTypes(results);
//             return getParkInfo();
//         });
//     }).then(() => {
//         getParkInfo().then((results) => {
//             data.setParkInfo(results);
//         });
        
//     });  
// };

const functioningRides = () => {
    let workingRides = [];
    updateMaintenance().then((results) => {
        console.log(results);
        attractionData.forEach((attraction) => {
            results.forEach((result) => {
                if (result.id != attraction.id) {
                    workingRides.push(attraction);
                }
            });
        });
        console.log(workingRides);
    }).catch((error) => {
        console.log("error in functioning rides", error);
    });
};

  module.exports = {setKey, functioningRides};

'use strict';

let firebaseKey = '';
let userUid = '';
const data = require('./data');


const setKey = (key) => {
    firebaseKey = key;
};

const updateMaintenance = () => {
    let attractionData = [];
    let maintenanceTickets = [];
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
                    let attractionMaintenanceData = [];
                        maintenanceTickets.forEach(( maintenanceDate ) => {
                        attractionData.forEach(( attraction ) => {
                            if ( attraction.id === maintenanceDate.attraction_id ) {
                                attraction.maintenance_date = maintenanceDate.maintenance_date;
                                attraction.maintenance_duration = maintenanceDate.maintenance_duration_hours;
                            }
                        });
                    });
                    attractionMaintenanceData = attractionData;
                    let workingAttractions = outOfOrderAttractions(attractionMaintenanceData);
                    resolve(workingAttractions);            
                }
            }).catch((error) => {
                reject(error);
            });
            resolve(attractionData);
            // console.log(maintenanceTickets);
            // console.log(attractionData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const workingAttractions = (attractions) => {
    let workingStuff = [];
    let currentTime = getCurrentTimeInUnix();
    attractions.forEach(( attraction, i ) => {
        let maintenanceStartTime = moment(attraction.maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').unix();        
        let maintenanceDuration = attraction.maintenance_duration_hours;        
        if ( currentTime > maintenanceStartTime + maintenanceDuration || currentTime < maintenanceStartTime ) {
            workingStuff.push(attraction);        
            // firebaseApi.updateAttractionMaintenance( updatedAttraction, index );
            // console.log('current time is greater then that shit', maintenanceStartTime);            
        } 
    });
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

// const functioningRides = () => {
//     updateMaintenance().then(results)
// }

  module.exports = {setKey, updateMaintenance};
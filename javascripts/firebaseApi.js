'use strict';

const data = require('./data');
const moment = require('../lib/node_modules/moment/moment.js');
const dom = require('./domHandler');
let firebaseKey = '';
let userUid = '';
let attractionData = [];
let maintenanceTickets = [];


const setKey = (key) => {
    firebaseKey = key;
};

const updateMaintenance = () => {
    
    let combinedAttractionTicketData = [];
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
                        attractionData.forEach(( attraction ) => {
                        maintenanceTickets.forEach(( maintenanceDate ) => {
                            if ( maintenanceDate.attraction_id === attraction.id ) {
                                attraction.maintenance_date  = maintenanceDate.maintenance_date;
                                attraction.maintenance_duration_hours = maintenanceDate.maintenance_duration;
                                combinedAttractionTicketData.push(attraction);
                            }
                        });
                    });                  
                    let brokenAttractions = outOfOrderAttractions(combinedAttractionTicketData);
                    resolve(brokenAttractions);            
                }
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
};

const getParkAreas = () => {
    let parkData = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/areas.json`).then((areas) => {
            if (areas != null) {
                Object.keys(areas).forEach((key) => {
                    areas[key].fbId = key;
                    parkData.push(areas[key]);
                });
            }
            resolve(parkData);
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
                    types[key].fbId = key;
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
                    info[key].fbId = key;
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
let parkAreas, parkAttractionTypes, parkInfo;
return new Promise((resolve, reject) => {
        getParkAreas().then((results) => {
        parkAreas = results;
            getParkAttractionTypes().then((results) => {
                parkAttractionTypes = results; 
                    getParkInfo().then((results) => {
                        parkInfo = results;   
                        resolve({parkAreas, parkAttractionTypes, parkInfo});  
                    }).catch((error) => {
                        reject(error);
                    });
            });
        });
    });
};

const outOfOrderAttractions = (attractions) => {
    let brokenStuff = [];
    let currentTime = moment().unix();
    attractions.forEach(( attraction, i ) => {
        let maintenanceStartTime = moment(attraction.maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').unix();        
        let maintenanceDuration = attraction.maintenance_duration_hours;        
        if ( currentTime > maintenanceStartTime + maintenanceDuration || currentTime < maintenanceStartTime ) {
            brokenStuff.push(attraction);                   
        } 
    });
    let brokenRides = brokenStuff.filter((item, i, ar) => 
    { return ar.indexOf(item) === i; });
    return brokenRides;
};

const functioningRides = () => {
    let workingRides = [];
    updateMaintenance().then((results) => {
        attractionData.forEach((attraction) => {
            results.forEach((result, i) => {
                if (result.id === attraction.id) {
                    attractionData.splice(i, 1);
                }
            });
        });
        dataGetter().then((results) => {
            data.setParkAreas(results.parkAreas);
            data.setParkAttractions(attractionData);
            data.setParkAttractionTypes(results.parkAttractionTypes);
            data.setParkInfo(results.parkInfo);
            let areasAndAttractions = smashThisShitTogether(results.parkAreas, attractionData, results.parkAttractionTypes);
            data.setSmashedData(areasAndAttractions);
            grabOpenAttractions(areasAndAttractions);
            dom.mainDomString(results.parkAreas, areasAndAttractions);
 
        });
    }).catch((error) => {
        console.log("error in functioning rides", error);
    });
};

// COMBINE AREAS INTO ATTRACTIONS DATA
// const smashThisShitTogether = (parkAreas, parkAttractions, parkAttractionTypes) => {   
// let smashedData = [];  
//     parkAreas.forEach(( area ) => {
//         parkAttractions.forEach(( attraction ) => {
//             if ( attraction.area_id === area.id ) {
//                 attraction.area_name = area.name;
//             }
//         });
//     });

//     smashedData = parkAttractions;
//     return smashedData;
// };

const smashThisShitTogether = (parkAreas, parkAttractions, parkAttractionTypes) => {   
let smashedData = [];  
    parkAreas.forEach(( area ) => {
        parkAttractions.forEach(( attraction ) => {
            parkAttractionTypes.forEach((type) => {
                if ( attraction.area_id === area.id && type.id === attraction.type_id ) {
                attraction.area_name = area.name;
                attraction.type_name = type.name;
            }
            });
        });
    });

    smashedData = parkAttractions;
    return smashedData;
};

// CURRENT TIME 



const grabOpenAttractions = (attractions) => {
    let printArray = [];
    let format = 'hh:mm a';
    const currentTime = moment().hour('hour').format('hh:mm a');
    let endTime = moment().endOf('hour').format('hh:mm a');
     attractionData.forEach((attraction, i) => {
     if (attraction.times != null) {
        attraction.times.forEach((time) => { 
     if  (moment(time, format).isBetween(moment(currentTime, format), moment(endTime, format))){
          // (moment('05:50:00 am', format).isBetween(moment('05:30:00 am',format), moment('06:50:00 am',format))){
     
        printArray.push(attraction);

        } else {

         // console.log('is not between', attraction.times);

        }
        });
     }
     
 }); 
     dom.leftDomString(printArray);
};


  module.exports = {setKey, functioningRides, dataGetter, grabOpenAttractions};

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
                    let combinedAttractionTicketData = [];
                        attractionData.forEach(( attraction ) => {
                        maintenanceTickets.forEach(( maintenanceDate ) => {
                            let obj = {};
                            if ( maintenanceDate.attraction_id === attraction.id ) {
                                obj.maintenance_date  = maintenanceDate.maintenance_date;
                                obj.maintenance_duration_hours = maintenanceDate.maintenance_duration_hours;
                                obj.id = attraction.id;
                                obj.area_id = attraction.area_id;
                                obj.description = attraction.description;
                                obj.fbId = attraction.fbId;
                                obj.name = attraction.name;
                                obj.type_id = attraction.type_id;
                                obj.out_of_order = attraction.out_of_order;
                                combinedAttractionTicketData.push(obj);
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
    let workingStuff = [];    
    let newAttractions = attractions.map((thing) => {
        if (thing.maintenance_date) {
            return thing;
        }        
    });
    newAttractions.forEach(( attraction ) => {
        let currentTime = moment().format('llll');
        let maintenanceDuration = attraction.maintenance_duration_hours;        
        let maintenanceStartTime = moment(attraction.maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').format('llll'); 
        let maintenanceEndTime = moment(maintenanceStartTime).add(maintenanceDuration, 'hours').format('llll'); 
        if ( moment(currentTime).isBetween(maintenanceStartTime, maintenanceEndTime) ) {
            attraction.out_of_order = true;
            brokenStuff.push(attraction);     
        } else {
            attraction.out_of_order = false; 
            workingStuff.push(attraction);     
        }
        buildAttractionToSend(workingStuff);
    });
    buildAttractionToSend(brokenStuff);    
    let workingRides = workingStuff.filter((item, i, ar) => { 
        return ar.indexOf(item) === i; });
    return workingRides;
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
            // buildEditedAttractions(attractionData);
            let areasAndAttractions = smashThisShitTogether(results.parkAreas, attractionData, results.parkAttractionTypes);
            data.setSmashedData(areasAndAttractions);
            grabOpenAttractions(areasAndAttractions);
            dom.mainDomString(results.parkAreas, areasAndAttractions);
 
        });
    }).catch((error) => {
        console.log("error in functioning rides", error);
    });
};

// const buildEditedAttractions = ( workingAttractions ) => {
//     let updatedAttractions = workingAttractions.filter(( attraction ) => {
//         if ( attraction.out_of_order === true ) {
//             return attraction;
//         }
//     }).map(( changeAttr ) => {
//         changeAttr.out_of_order = false;
//         return changeAttr;
//     });
//     // buildAttractionToSend( updatedAttractions );
// };

const buildAttractionToSend = ( updatedAttractions ) => {
    updatedAttractions.forEach(( attraction ) => {
        let fbId = attraction.fbId;
        let newAttra = {
            out_of_order: attraction.out_of_order,
            area_id: attraction.area_id,
            description: attraction.description,
            id: attraction.id,
            name: attraction.name,
            type_id: attraction.type_id,
        };
        updateEachAttraction( newAttra, fbId );
    });
};

const updateEachAttraction = ( attraction, fbId ) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "PUT",
            url: `${firebaseKey.databaseURL}/attractions/${fbId}.json`,
            data: JSON.stringify(attraction)
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

// COMBINE AREAS INTO ATTRACTIONS DATA


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
     if (moment(time, format).isBetween(moment(currentTime, format), moment(endTime, format))){
         printArray.push(attraction);
        } else {
       }
    });
   }   
 }); 
     dom.leftDomString(printArray);
};


  module.exports = {setKey, functioningRides, dataGetter, grabOpenAttractions};

'use strict';

let firebaseKey = '';
let userUid = '';
const data = require('./data');
const moment = require('./../lib/node_modules/moment/moment');

const setKey = (key) => {
    firebaseKey = key;
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
let attractionData = [];
const getParkAttractions = () => {
    
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json`).then((attractions) => {
            if (attractions != null) {
                Object.keys(attractions).forEach((key) => {
                    attractions[key].fbId = key;
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

const getMaintenanceInfo = () => {
    let maintenanceData = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/maintenance_tickets.json`).then((times) => {
            if (times != null) {
                Object.keys(times).forEach((key) => {
                    times[key].fbId = key;
                    maintenanceData.push(times[key]);
                });
            }
            resolve(maintenanceData);
        }).catch((error) => {
            reject(error);
        });
    });
};

const dataGetter = () => {
    return new Promise(( resolve, reject ) => {
        getParkAttractions().then((results) => {
            data.setParkAttractions(results);
        return getParkAreas();
        }).then(() => {
            getParkAreas().then((results) => {
                data.setParkAreas(results);
                return getParkAttractionTypes();
            });
        }).then(() => {
            getParkAttractionTypes().then((results) => {
                data.setParkAttractionTypes(results);
                return getParkInfo();
            });
        }).then(() => {
            getParkInfo().then((results) => {
                data.setParkInfo(results); 
                return getMaintenanceInfo();           
            });
            
        }).then(() => {
            getMaintenanceInfo().then((maintenanceInfo) => {
                data.setMaintenanceInfo(maintenanceInfo);
                smashMaintenanceInfoWithAttractions(maintenanceInfo);
            });
        }).then((results) => {
            resolve(results);
        });
    });  
};

const getCurrentTimeInUnix = () => {
    return moment().unix();
};

const smashMaintenanceInfoWithAttractions = (maintenanceInfo) => {
    let smashedMaintenanceInfoWithAttractions = [];
    maintenanceInfo.forEach(( maintenanceDate ) => {
        attractionData.forEach(( attraction ) => {
            if ( attraction.id === maintenanceDate.attraction_id ) {
                attraction.maintenance_date = maintenanceDate.maintenance_date;
                attraction.maintenance_duration = maintenanceDate.maintenance_duration_hours;
            }
        });
    });
    smashedMaintenanceInfoWithAttractions = attractionData;       
    console.log('smashedMaintenanceInfoWithAttractions:', smashedMaintenanceInfoWithAttractions);
    // updateMaintenance(smashedMaintenanceInfoWithAttractions);
};

const updateMaintenance = (smashedMaintenanceInfoWithAttractions) => {           
    let currentTime = getCurrentTimeInUnix();
    let maintenanceInfo = data.setMaintenanceInfo();
    maintenanceInfo.forEach(( maintenanceDate, i ) => {
        let maintenanceStartTime = moment(maintenanceDate.maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').unix();        
        let maintenanceDuration = maintenanceDate.maintenance_duration_hours;        
        if ( currentTime > maintenanceStartTime + maintenanceDuration ) {
            let updatedAttraction = {
                fbId: '',
                out_of_order: '',
            };            
            // firebaseApi.updateAttractionMaintenance( updatedAttraction, index );
            // console.log('current time is greater then that shit', maintenanceStartTime);            
        } 
    });
};

const updateAttractionMaintenance = ( updatedAttraction, index ) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "PUT",
            url: `${firebaseKey.databaseURL}/attractions/${index}.json`,
            data: JSON.stringify( updatedAttraction )
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {updateAttractionMaintenance, setKey, dataGetter};

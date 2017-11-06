'use strict';

const dom = require('./domHandler');
const moment = require('./../lib/node_modules/moment/moment');
const firebaseApi = require('./firebaseApi');

let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];
let maintenanceInfo = [];
let smashedAreasWithAttractions = [];
let smashedMaintenanceInfoWithAttractions = [];

// COMBINE AREAS INTO ATTRACTIONS DATA
const smashAreasWithAttractions = () => {     
    parkAreas.forEach(( area ) => {
        parkAttractions.forEach(( attraction ) => {
            if ( attraction.area_id === area.id ) {
                attraction.area_name = area.name;
            }
        });
    });
    smashedAreasWithAttractions = parkAttractions;
    dom.mainDomString( parkAreas, smashedAreasWithAttractions );
};

// FILTER USER SEARCH QUERY AND FIRE HIGHLIGHT FUNC
const filterSearchTxt = ( txt ) => {
    txt = txt.toUpperCase();
    let filteredResults = parkAttractions.filter(( attraction ) => {
        return attraction.name.toUpperCase().indexOf( txt ) > -1;        
    });
    highlightFilteredAttractions( filteredResults );        
};

// HIGHLIGHT AREAS WITH BORDER BASED ON SEARCH QUERY
const highlightFilteredAttractions = ( filteredResults ) => {
    parkAreas.forEach(( area ) => {
        $(`#area-${area.id}`).removeClass('border-highlight');
    });
    filteredResults.forEach(( attraction ) => {
        $(`#area-${attraction.area_id}`).addClass('border-highlight');
    });
};

// GET DATA FOR ATTRACTIONS AND ATTRACTION TYPES
const attractionData = (area) => {
    let printArray = [];

    parkAttractionTypes.forEach((type) => {
        smashedAreasWithAttractions.forEach((attraction) => {
            if (attraction.type_id === type.id) {
                attraction.type_name = type.name;
            }
        });
    });
    
    smashedAreasWithAttractions.forEach((thing) => {
        if (thing.area_id === area) {
            printArray.push(thing);
        }
    });
    dom.leftDomString(printArray);
};

const smashMaintenanceInfoWithAttractions = () => {
    maintenanceInfo.forEach(( maintenanceDate ) => {
        parkAttractions.forEach(( attraction ) => {
            if ( attraction.id === maintenanceDate.attraction_id ) {
                maintenanceDate.attractionName = attraction.name;
                // maintenanceDate.out_of_order = attraction.out_of_order;
            }
        });
    });
    smashedMaintenanceInfoWithAttractions = maintenanceInfo;
    updateMaintenance();
};

const updateMaintenance = () => {    
    console.log('parkAttractions:', parkAttractions);
    console.log('smashedMaintenanceInfoWithAttractions:', smashedMaintenanceInfoWithAttractions);
    let currentTime = getCurrentTimeInUnix();
    maintenanceInfo.forEach(( maintenanceDate, i ) => {
        let maintenanceStartTime = moment(maintenanceDate.maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').unix();        
        if ( currentTime > maintenanceStartTime + maintenanceDate.maintenance_duration_hours ) {
            let updatedAttraction = {

            };
            
            // firebaseApi.updateAttractionMaintenance( updatedAttraction );
            // console.log('current time is greater then that shit', maintenanceStartTime);            
        } 
        // console.log('that shit is not greater', maintenanceStartTime);
    });
};

const getCurrentTimeInUnix = () => {
    return moment().unix();
};

const setParkAreas = (areas) => {
    parkAreas = areas;
};

const setParkAttractions = (attractions) => {
    parkAttractions = attractions;
};

const setParkAttractionTypes = (attractionTypes) => {
    parkAttractionTypes = attractionTypes;
};

const setParkInfo = (info) => {
    parkInfo = info;
    smashAreasWithAttractions();
};

const setMaintenanceInfo = (times) => {
    maintenanceInfo = times;
    smashMaintenanceInfoWithAttractions();    
};

module.exports = {updateMaintenance, filterSearchTxt, setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, smashAreasWithAttractions, attractionData, setMaintenanceInfo};

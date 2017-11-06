'use strict';

const dom = require('./domHandler');
const moment = require('./../lib/node_modules/moment/moment');

let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];
let maintenanceInfo = [];
let smashedData = [];

// COMBINE AREAS INTO ATTRACTIONS DATA
const smashAreasWithAttractions = () => {     
    parkAreas.forEach(( area ) => {
        parkAttractions.forEach(( attraction ) => {
            if ( attraction.area_id === area.id ) {
                attraction.area_name = area.name;
            }
        });
    });
    smashedData = parkAttractions;
    dom.mainDomString( parkAreas, smashedData );
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
        smashedData.forEach((attraction) => {
            if (attraction.type_id === type.id) {
                attraction.type_name = type.name;
            }
        });
    });
    
    smashedData.forEach((thing) => {
        if (thing.area_id === area) {
            printArray.push(thing);
        }
    });
    dom.leftDomString(printArray);
};

const updateMaintenance = () => {
    console.log('moment format:', moment(maintenanceInfo[0].maintenance_date.slice(0, 24), 'ddd-MMM-DD-YYYY-HH:mm:ss').format('llll'));
    // console.log('parkAttractions:', parkAttractions);
    console.log('maintenanceInfo:', maintenanceInfo);
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
    updateMaintenance();
};

module.exports = {updateMaintenance, filterSearchTxt, setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, smashAreasWithAttractions, attractionData, setMaintenanceInfo};

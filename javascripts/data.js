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

const getCurrentTimeInUnix = () => {
    return moment().unix();
};

const setParkAreas = (areas) => {
    parkAreas = areas;
};

const setParkAttractions = (attractions) => {
    parkAttractions = attractions;
    return attractions;
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
    return times;
};

module.exports = {filterSearchTxt, setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, smashAreasWithAttractions, attractionData, setMaintenanceInfo};

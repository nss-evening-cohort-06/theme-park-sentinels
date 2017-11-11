'use strict';

const dom = require('./domHandler');
let moment = require('../lib/node_modules/moment/moment.js');

let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];
let maintenanceInfo = [];
let smashedData = [];

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
    
    smashedData.forEach((thing) => {
        if (thing.area_id === area) {
            printArray.push(thing);
        } 
    });
    dom.leftDomString(printArray);
};


const setParkAreas = (areas) => {
    parkAreas = areas;
};

const setSmashedData = (data) => {
    data = data.map((attraction) => {
        if (attraction.out_of_order != true) {
            smashedData.push(attraction);
        }
        return data;
    });
};

const setParkAttractions = (attractions) => {
    parkAttractions = attractions;
};

const setParkAttractionTypes = (attractionTypes) => {
    parkAttractionTypes = attractionTypes;
};

const setParkInfo = (info) => {
    parkInfo = info;
};





module.exports = {filterSearchTxt, setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, attractionData, setSmashedData};

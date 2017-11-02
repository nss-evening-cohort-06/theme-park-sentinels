'use strict';

const dom = require('./domHandler');

let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];
let smashedData = [];

const smashThisShitTogether = () => {     
    parkAreas.forEach(( area ) => {
        parkAttractions.forEach(( attraction ) => {
            if ( attraction.area_id === area.id ) {
                attraction.areaName = area.name;
            }
        });
    });
    smashedData = parkAttractions;
    dom.mainDomString( parkAreas, smashedData );
};

const filterSearchTxt = ( txt ) => {
    let filteredResults = parkAttractions.filter(( attraction ) => {
        return attraction.name.indexOf(txt) > -1;        
    });
    // console.log('results:', results);
    highlightFilteredAttractions( filteredResults );        
};

const highlightFilteredAttractions = ( filteredResults ) => {
    filteredResults.forEach(( attraction ) => {
        console.log('attraction:', attraction);
        $(`#area-${attraction.area_id}`).addClass('border-highlight');
    });
};

// When user user presses enter
// Then the areas that contain an attraction, whose name contains the search string, should be outlined with a border
// Use regular expressions to match the user's search string with the name of each attraction to find a match. 
// The search string simply must be contained in the attraction name, not just start with.

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
    smashThisShitTogether();
};

module.exports = {filterSearchTxt, setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, smashThisShitTogether};

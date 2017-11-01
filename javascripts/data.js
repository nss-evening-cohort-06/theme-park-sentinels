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
    let results = parkAttractions.filter(( thing ) => {
        return thing.name.indexOf(txt) > -1;        
    });
    console.log('results:', results);
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
    smashThisShitTogether();
};

module.exports = {filterSearchTxt, setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, smashThisShitTogether};

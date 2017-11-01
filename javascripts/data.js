'use strict';

const dom = require('./domHandler');

let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];
let smashedData = [];

const smashThisShitTogether = () => { 
    // console.log('parkAreas', parkAreas);    
    // console.log('parkAttractions', parkAttractions);    
    parkAreas.forEach(( area ) => {
        parkAttractions.forEach(( attraction ) => {
            if ( attraction.area_id === area.id ) {
                attraction.areaName = area.name;
            }
        });
    });
    smashedData = parkAttractions;
    // console.log('smashedData:', smashedData);
    dom.mainDomString( parkAreas, smashedData );
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

module.exports = {setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo, smashThisShitTogether};

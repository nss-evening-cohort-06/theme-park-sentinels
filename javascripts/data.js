'use strict';

const dom = require('./domHandler');

let smashedData = [];

const smashThisShitTogether = ( parkAreas, parkAttractions ) => {     
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

module.exports = { smashThisShitTogether }; 
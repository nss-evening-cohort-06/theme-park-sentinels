'use strict';

let parkAreas = [];
let parkAttractions = [];
let parkAttractionTypes = [];
let parkInfo = [];

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
};

module.exports = {setParkAreas, setParkAttractions, setParkAttractionTypes, setParkInfo};
'use strict';

const firebaseApi = require('./firebaseApi');
let attractionsStringArray = [];

const buildAttractionsString = ( parkAreas, smashedData ) => {
    // console.log('parkAreas in dom:', parkAreas);
    // console.log('smashedData in dom:', smashedData);
    let attractionString = '';
    smashedData.forEach(( attraction ) => {
        attractionString = `<div class='col-md-4'>${attraction.name}</div>`;
        attractionsStringArray.push(attractionString);
    });
    // console.log('attractionsStringArray in dom:', attractionsStringArray);
    buildMainAreaGrid( parkAreas, attractionsStringArray );
};

const buildMainAreaGrid = ( parkAreas, attractionsStringArray ) => {
    parkAreas.forEach(( area ) => {
        console.log('area:', area);
        // attractionsStringArray.forEach(( attr ) => {            
        // });
    });
    // printToDom( str, '' );
};

const leftDomString = ( arg1, arg2 ) => {

};

const printToDom = ( str, divName ) => {

};

module.exports = { buildAttractionsString, leftDomString }; 
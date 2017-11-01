'use strict';

const firebaseApi = require('./firebaseApi');
// let attractionsStringArray = [];

const buildAttractionsString = ( parkAreas, smashedData ) => {
    let str = '';
    parkAreas.forEach(( area ) => {
        console.log('area:', area);
        str += `<div id='${area.name}' class='col-md-3'><h3>${area.name}</h3></div>`;
        smashedData.forEach(( attraction ) => {
            console.log('attraction:', attraction);
            if ( attraction.area_id === area.id ) {
                str += `<div class='col-md-3 hidden'><p>${attraction.name}</p></div>`;
            }
        });
    });
};

const leftDomString = ( arg1, arg2 ) => {

};

const printToDom = ( str, divName ) => {

};

module.exports = { buildAttractionsString, leftDomString }; 
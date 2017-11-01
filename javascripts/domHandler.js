'use strict';

const firebaseApi = require('./firebaseApi');
// let attractionsStringArray = [];

const buildAttractionsString = ( parkAreas, smashedData ) => {
    let str = '';
    parkAreas.forEach(( area, i ) => {
        if (i % 3 === 0) {
            str += `<div class="row">`;
        }
        str += `<div id='area-${area.id}' class='col-md-4 thumbnail fixed-dimensions'><h3>${area.name}</h3>`;
        smashedData.forEach(( attraction ) => {
            if ( area.id === attraction.area_id ) {
                str += `<div class='col-md-3 hidden'><p>${attraction.name}</p></div>`;
            }
        });
        str += `</div>`;
        // if (i % 3 === 2 || i === smashedData.length - 1) {
        //     str += `</div>`;
        // }
    });
    printToDom(str, 'main-grid');
};

const leftDomString = ( arg1, arg2 ) => {

};

const printToDom = ( str, divName ) => {
    $(`#${divName}`).html(str);
};

module.exports = { buildAttractionsString, leftDomString }; 
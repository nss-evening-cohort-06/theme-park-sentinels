'use strict';

const firebaseApi = require('./firebaseApi');
// let attractionsStringArray = [];

const mainDomString = ( parkAreas, smashedData ) => {
    let str = '';
    parkAreas.forEach(( area, i ) => {
        if (i % 3 === 0) {
            str += `<div class="row top-buffer">`;
        } if ( i === 6 ) {
            str += `<div class='empty hi col-xs-4'></div>`;
            str += `<div class='empty hi col-xs-4'><h3>Entrance</h3></div>`;
        }
        str += `<div id='area-${area.id}' class='hi col-xs-4'><h3>${area.name}</h3>`;
        smashedData.forEach(( attraction ) => {
            if ( area.id === attraction.area_id ) {
                str += `<div id='attraction-${attraction.id}' class='hi col-xs-4 hidden'><p>${attraction.name}</p></div>`;
            }
        });
        str += `</div>`;
        if (i % 3 === 2 || i === smashedData.length - 1) {
            str += `</div>`;
        }
    });
    printToDom(str, 'main-grid');
};

const leftDomString = ( arg1, arg2 ) => {

};

const printToDom = ( str, divName ) => {
    $(`#${divName}`).html(str);
};

module.exports = { mainDomString, leftDomString }; 
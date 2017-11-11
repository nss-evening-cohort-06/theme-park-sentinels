'use strict';

const firebaseApi = require('./firebaseApi');


const mainDomString = ( parkAreas, areasAndAttractions ) => {
    let str = '';
    parkAreas.forEach(( area, i ) => {
        if (i % 3 === 0) {
            str += `<div class="row top-buffer">`;
        } if ( i === 6 ) {
            str += `<div class='empty hi col-xs-4'></div>`;
            str += `<div id='Entrance' class='empty hi col-xs-4'><h3>Entrance</h3></div>`;
        }
        str += `<div id='area-${area.id}' class='hi col-xs-4'><h3>${area.name}</h3>`;
        areasAndAttractions.forEach(( attraction ) => {
            if ( area.id === attraction.area_id ) {
                str += `<div id='attraction-${attraction.id}' class='hi col-xs-4 hidden'><p>${attraction.name}</p></div>`;
            }
        });
        str += `</div>`;
        if (i % 3 === 2 || i === areasAndAttractions.length - 1) {
            str += `</div>`;
        }
    });
    printToDom(str, 'main-grid');
};

const leftDomString = ( attractions) => {
    let i = 0;
    let printStrang = `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;
    attractions.forEach((attraction) => {
        if (attraction.out_of_order === true) {
        } 
        printStrang +=  `<div class="panel panel-default">`;
        printStrang +=      `<div class="panel-heading" id="sideTab" role="tab" id="heading${i}">`;
        printStrang +=          `<h4 class="panel-title">`;
        printStrang +=             `<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">${attraction.name} (${attraction.type_name})</a>`;
        printStrang +=          `</h4>`;
        printStrang +=      `</div>`;
        printStrang +=      `<div id="collapse${i}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${i}">`;
        printStrang +=          `<div class="panel-body">`;
        printStrang +=              `<p>${attraction.description}</p>`;
        if (attraction.times != null) {
            let runTimes = ``;
            attraction.times.forEach((time) => {            
            runTimes += `<li>${time}</li>`;   
        });  
        printStrang +=          `<p>Hours of Operation:</p>`;  
        printStrang +=             `<li>`;
        printStrang +=                  `${runTimes}`;
        printStrang +=             `</li>`; 
        }
        printStrang +=          `</div>`;
        printStrang +=      `</div>`;
        printStrang +=  `</div>`;
        
        i++;
    });
    printStrang += `</div>`;
    printToDom(printStrang, 'attractions-div');
    $('#attractions-div').removeClass('hide');
};



const printToDom = ( str, divName ) => {
    $(`#${divName}`).html(str);
};

module.exports = { mainDomString, leftDomString }; 
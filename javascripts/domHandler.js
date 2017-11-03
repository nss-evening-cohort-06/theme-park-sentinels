'use strict';

const firebaseApi = require('./firebaseApi');


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

// const leftDomString = ( attractions ) => {
//     let runTimes = ``;
//     let printStrang = `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;
//     attractions.forEach((attraction) => {
//         printStrang +=  `<div class="panel panel-default">`;
//         printStrang +=      `<div class="panel-heading" role="tab" id="headingOne">`;
//         printStrang +=          `<h4 class="panel-title">`;
//         printStrang +=             `<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">${attraction.name}(${attraction.typeName})</a>`;
//         printStrang +=          `</h4>`;
//         printStrang +=      `</div>`;
//         printStrang +=      `<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">`;
//         printStrang +=          `<div class="panel-body">${attraction.description}</div>`;
//         if (attraction.time != null) {
//         attraction.times.forEach((time) => {
//             runTimes += time;    
//         });  
//         printStrang +=          `<div class="panel-body">Hours of Operation: ${runTimes}</div>`;  
//         }
//         printStrang +=      `</div>`;
//         printStrang +=  `</div>`;    
//     });
//     printStrang += `</div>`;
//     printToDom(printStrang, 'attractions-div');
//     $('#attractions-div').removeClass('hide');
// };

const leftDomString = (attractions) => {
    let runTimes = ``;
    let printStrang = ``;

    attractions.forEach((attraction) => {
        printStrang += `<input id="toggle" type="checkbox">`;
        printStrang +=  `<label for="toggle">${attraction.name}(${attraction.typeName})</label>`;
        printStrang +=      `<div id="expand">`;
        printStrang +=          `<section>`;
        printStrang +=              `<p>${attraction.description}</p>`;
        if (attraction.time != null) {
            attraction.times.forEach((time) => {
                runTimes += time;    
            });  
            printStrang +=          `<p class="panel-body">Hours of Operation: ${runTimes}</p>`;  
            }
        printStrang +=          `</section>`;  
        printStrang +=      `</div>`;
    });
    $('#attractions-div').removeClass('hide');  
    printToDom(printStrang, 'attractions-div');
    console.log(printStrang);
};

const printToDom = ( str, divName ) => {
    $(`#${divName}`).html(str);
};

module.exports = { mainDomString, leftDomString }; 
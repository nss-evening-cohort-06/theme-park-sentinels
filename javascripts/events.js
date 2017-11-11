'use strict';
const firebaseApi = require('./firebaseApi');
const data = require('./data');
const moment = require('../lib/node_modules/moment/moment.js');

let searchBar = $('#inputHolder');
let submitBtn = $('#submitBtn');




// SEARCH INPUT EVENTS
const searchBarBtnClick = () => {
    submitBtn.click(( e ) => {
        e.preventDefault();
        let txt = $( searchBar ).val();
        data.filterSearchTxt( txt );
    });
};

const searchBarKeypress = () => {    
    searchBar.keypress(( e ) => {        
        if ( e.key === 'Enter' ) {
            e.preventDefault();
            let txt = $( searchBar ).val();
            data.filterSearchTxt( txt );
        }
    });
};

// CLICK EVENT FOR PARK AREA DATA
const displayAttractions = () => {
    $('body').click((e) => {
        if (e.target.id.includes('area')) {
            let area = e.target;
            $(area).find('h3').addClass('animated jello').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                $(area).find('h3').removeClass('animated jello');
            });
            let areaData = parseInt(e.target.id.split('-').pop());
            data.attractionData(areaData);
        }
    });
};



        


// INITIALIZE EVENTS IN MAIN.JS

const init = () => {
    searchBarBtnClick();
    searchBarKeypress();
    displayAttractions();

};


module.exports = {init};

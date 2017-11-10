'use strict';
const firebaseApi = require('./firebaseApi');
const data = require('./data');

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
            let areaData = parseInt(e.target.id.split('-').pop());
            data.attractionData(areaData);
        }
    });
};


// CLICK EVENT FOR TIME PICKER


    $('#time').on('change', function (event) {
    let timeValue = $('#time').val();
        console.log("value", timeValue);
        
    });



// INITIALIZE EVENTS IN MAIN.JS

const init = () => {
    searchBarBtnClick();
    searchBarKeypress();
    displayAttractions();

};


module.exports = {init};

'use strict';
const firebaseApi = require('./firebaseApi');
const data = require('./data');

let searchBar = $('#inputHolder');
let submitBtn = $('#submitBtn');

// const googleAuth = () => {
//     $('#googleauth').click((e) => {
//         firebaseApi.authenticateGoogle().then((result) => {
//             console.log(result);
//         }).catch((error) => {
//             console.log("error in authenticate google", error);
//         });
//     });
// };

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

const init = () => {
    // googleAuth();
    searchBarBtnClick();
    searchBarKeypress();
};

module.exports = {init};
// When user user presses enter
// Then the areas that contain an attraction, whose name contains the search string, should be outlined with a border
// Use regular expressions to match the user's search string with the name of each attraction to find a match. 
// The search string simply must be contained in the attraction name, not just start with.
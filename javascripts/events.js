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
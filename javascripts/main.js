'use strict';
const events = require('./events');
const apiKeys = require('./apiKeys');
let moment = require('../lib/node_modules/moment/moment.js');
moment().format();
// const copyright = require('./copyright');


$(document).ready(function(){
    apiKeys.retrieveKeys();
    events.init();
    $('#time').bootstrapMaterialDatePicker({ date: false });
});

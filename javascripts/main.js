'use strict';
const events = require('./events');
const apiKeys = require('./apiKeys');
const copyright = require('./copyright');
const moment = require('../lib/node_modules/moment/moment');


$(document).ready(function(){
    apiKeys.retrieveKeys();
    events.init();
});
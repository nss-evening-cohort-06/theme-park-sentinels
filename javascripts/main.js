'use strict';
const events = require('./events');
const apiKeys = require('./apiKeys');

$(document).ready(function(){
    apiKeys.retrieveKeys();
    events.init();
});

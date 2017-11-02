'use strict';
const events = require('./events');
const apiKeys = require('./apiKeys');
const copyright = require('./copyright');


$(document).ready(function(){
    apiKeys.retrieveKeys();
});

"use strict";

var newDate = new Date();
newDate.setDate(newDate.getDate());
document.getElementById('displayDate').innerHTML = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
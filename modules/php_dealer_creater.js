var fs = require('fs');
var path = require('path');
var php_check = require('./php_check.js');
var php_read = require('php-parser');
var php_make = require('php-unparser');

module.exports = function(updates, phpInFile) {
	phpInFile.children[0].expr.items.map(function(item) {
		console.log('dis: ', item.value.items);
		return item;
	});
};
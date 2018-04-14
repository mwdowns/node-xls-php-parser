var fs = require('fs');
var path = require('path');
var php_check = require('./php_check.js');
var php_read = require('php-parser');
var php_make = require('php-unparser');


/**
 * [arrayCreater description]
 * @param	string	 			key   		this will be the key for the key/value block
 * @param 	string or array 	value		this will be the value (either a string or an array)
 * @return	string				string		will look like 'key' => 'value',
 */
var arrayCreater = function(key, value) {
	var indexTab = "		";
	var line;
	if (typeof value === 'string') {
		line = "'" + key + "' " + '=>' + " '" + value + "',";
	}
	if (Array.isArray(value)) {
		var firstPart = "'" + key + "' " + '=> [\n';
		var arrVals = [];
		var valLen = value.length - 1;
		var indent = "			";
		value.map(function(entry, index) {
			if (index === valLen) {
				arrVals.push(indent + "'" + entry + "'" + ",");
			} else {
				arrVals.push(indent + "'" + entry + "'" + ",\n");
			}
			return entry;
		});
		var lastPart = '\n' + indexTab + '],';
		line = firstPart + arrVals.join('') + lastPart;
	}
	var middle = indexTab + line;
	return middle;
};

module.exports = function(updates, phpInFile) {
	console.log(updates[0]);
	// phpInFile.children[0].expr.items.map(function(item, index) {
	// 	if (updates[0][0] === item.value.items[2].value.value) {
	// 		console.log('yo!');
	// 		console.log(updates[index][2]);
	// 		console.log(item.value.items[6].value.items[0]);
	// 		//map over updates[index][2] and updates[index][3] creating new entries for the php file
	// 	}
	// 	return item;
	// });
	var head = '<?php\n\nreturn [\n';
	var tail = '\n];';
	var middle = [];
	updates.map(function(entry, index) {
		var stuff = [];
		var begin = '	[\n';
		var end = '\n	],\n';
		updates[index].map(function(values) {
			var line = arrayCreater('blah', values);
			// console.log(line);
			stuff.push(line + '\n');
			return values;
		});
		middle.push(begin + stuff.join('') + end);
		return entry;
	});
	var newFile = head + middle.join('') + tail;
	fs.writeFile('dealers2.php', newFile, (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
};
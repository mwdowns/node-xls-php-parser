var fs = require('fs');
var path = require('path');
var php_check = require('./php_check.js');
var php_read = require('php-parser');
var php_make = require('php-unparser');

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
	var newFile = php_make(phpInFile);
	fs.writeFile('poop.php', newFile, (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	  });
};
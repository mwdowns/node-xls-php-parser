// Node app for parsing xls file and php file and merging the xls info into the php file.

// var xls = require('xlsx');
// var unparse = require('php-unparser');
var php_parser = require('./php_category_parser.js');

var categories = php_parser('categories.php');
console.log(categories);



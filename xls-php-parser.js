// Node app for parsing xls file and php file and merging the xls info into the php file.

// var xls = require('xlsx');
// var unparse = require('php-unparser');
var php_parser = require('./php_category_parser.js');
var xls_dealer_parser = require('./xls_dealer_parser.js');
var php_dealer_parser = require('./php_dealer_parser.js');

var dealers = xls_dealer_parser('dealers.xls');
console.log(dealers[0]);

var categories = php_parser('categories.php');
console.log(categories[0]);
var Cars = categories[0];
var Codes = categories[1];

var dealersInfo = php_dealer_parser('dealers.php');
console.log(dealersInfo[0]);

var dealersLen = dealers.length;
for (var i = 0; i < dealersLen; i++) {
    var dealerRow = Object.keys(dealers[i]);
    var dealer = dealers[i][dealerRow[0]];
    // console.log(dealer);
}
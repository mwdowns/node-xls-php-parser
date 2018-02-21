// Node app for parsing xls file and php file and merging the xls info into the php file.

// var xls = require('xlsx');
// var unparse = require('php-unparser');
var php_parser = require('./php_category_parser.js');
var xls_dealer_parser = require('./xls_dealer_parser.js');
var php_dealer_parser = require('./php_dealer_parser.js');

var dealers = xls_dealer_parser('dealers.xls');
// console.log(dealers[0]);

var categories = php_parser('categories.php');
// console.log(categories[0]);
var Cars = categories[0];
var Codes = categories[1];

var dealersInfo = php_dealer_parser('dealers.php');
// console.log(dealersInfo[0]);

var dealersLen = dealers.length;
var dealersToUpdate = [];
dealers.map(function(dealer, index) {
    var beforeCarsIndex = 500000;
    var dealerRow = Object.keys(dealers[index]);
    var dealerInfo = dealers[index][dealerRow[0]];
    // console.log(dealer);
    var dealerID = dealerInfo[0][1];
    // console.log(dealerID);
    var emails = [];
    var carCodes = [];
    dealerInfo.map(function(entry, index) {
        if (index < beforeCarsIndex) {
            console.log(index);
        } else {
            console.log(entry[0]);
            if (Cars.indexOf(entry[0]) != -1) {
                console.log(Codes[Cars.indexOf(entry[0])]);
            }
        }
        switch (entry[0]) {
            case 'zone manager e-mail':
                emails.push(entry[1]);
                break;
            case 'special e-mail cc +':
                emails.push(entry[1]);
                beforeCarsIndex = index;
                break;
            default:
                break;
        }
        return entry;
    });
    var dealerData = {[dealerID]: {
        emails_cc: emails,
        models: carCodes,
    }};
    dealersToUpdate.push(dealerData);
    return dealer;
});

console.log(dealersToUpdate[0][676].emails_cc);
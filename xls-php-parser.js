// Node app for parsing xls file and php file and merging the xls info into the php file.

// var unparse = require('php-unparser');
var php_category_parser = require('./modules/php_category_parser.js');
var xls_dealer_parser = require('./modules/xls_dealer_parser.js');
var php_dealer_parser = require('./modules/php_dealer_parser.js');
var php_maker = require('./modules/php_dealer_creater');
var updatesArrayCreator = require('./modules/updatesArrayCreator.js');
var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the path to the XLS file? ', (answer1) => {
    answer1 = 'dealers.xls';
    var dealersXLSInfo = xls_dealer_parser(answer1);
    rl.question('What is the path to the dealers PHP file? ', (answer2) => {
        answer2 = 'dealers.php';
        var dealersPHPInfo = php_dealer_parser(answer2);
        rl.question('What is the path to the categories PHP file? ', (answer3) => {
            answer3 = 'categories.php';
            var categories = php_category_parser(answer3);
            if (typeof dealersXLSInfo[0] === 'string') {
                console.log("Error: ", dealersXLSInfo[0]);
            } else if (typeof dealersPHPInfo[0] === 'string') {
                console.log("Error: ", dealersPHPInfo[0]);
            } else if (typeof categories[0] === 'string') {
                console.log("Error: ", categories[0]);
            } else {
                var dealersToUpdate = updatesArrayCreator(categories, dealersXLSInfo);
                dealersToUpateCreator(dealersToUpdate, dealersPHPInfo);
                php_maker(dealersPHPInfo[0], dealersPHPInfo[1]);
            }
            rl.close();
        });
    });
});

function dealersToUpateCreator(dealersToUpdate, dealersPHPInfo) {
    dealersToUpdate.map(function(updatedInfo, index) {
        var key = Object.keys(updatedInfo)[0];
        if ( key === dealersPHPInfo[0][index][0]) {
            dealersPHPInfo[0][index][2] = updatedInfo[key].emails_cc;
            dealersPHPInfo[0][index][3] = updatedInfo[key].models;
        }
        return updatedInfo;
    });
}
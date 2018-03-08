// Node app for parsing xls file and php file and merging the xls info into the php file.

// var unparse = require('php-unparser');
var php_parser = require('./php_category_parser.js');
var xls_dealer_parser = require('./xls_dealer_parser.js');
var php_dealer_parser = require('./php_dealer_parser.js');
var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var dealersToUpdate = [];

rl.question('What is the path to the XLS file? ', (answer1) => {
    var dealers = xls_dealer_parser(answer1);
    rl.question('What is the path to the dealers PHP file? ', (answer2) => {
        var dealersInfo = php_dealer_parser(answer2);
        rl.question('What is the path to the categories PHP file? ', (answer3) => {
            var categories = php_parser(answer3);
            if (typeof dealers[0] === 'string') {
                console.log("Error: ", dealers[0]);
            } else if (typeof dealersInfo[0] === 'string') {
                console.log("Error: ", dealersInfo[0]);
            } else if (typeof categories[0] === 'string') {
                console.log("Error: ", categories[0]);
            } else {
                var Cars = categories[0];
                var Codes = categories[1];
                dealers.map(function(dealer, index) {
                    var beforeCarsIndex = 500000;
                    var dealerRow = Object.keys(dealers[index]);
                    var dealerInfo = dealers[index][dealerRow[0]];
                    var dealerID = dealerInfo[0][1];
                    var emails = [];
                    var carCodes = [];
                    dealerInfo.map(function(entry, index) {
                        if (index > beforeCarsIndex && Cars.indexOf(entry[0]) != -1) {
                            carCodes.push(Codes[Cars.indexOf(entry[0])]);
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
            }
            console.log(dealersToUpdate[0]);
            rl.close();
        });
    });
});
// Node app for parsing xls file and php file and merging the xls info into the php file.

// var xls = require('xlsx');
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

var check_stat = function(file) {
    try {
        fs.accessSync(file);
    } catch(e) {
        return false;
    }
    return true;
};

rl.question('What is the path to the XLS file? ', (answer1) => {
    rl.question('What is the path to the dealers PHP file? ', (answer2) => {
        rl.question('What is the path to the categories PHP file? ', (answer3) => {
            var dealers = check_stat(answer1) ? xls_dealer_parser(answer1) : 'your xls file is bad';
            // var dealersInfo = php_dealer_parser(answer2);
            // var categories = php_parser(answer3);
            console.log(dealers);
            // if (typeof dealers[0] === 'string') {
            //     console.log("Error: ", dealers[0]);
            // // } else if (typeof dealers[0] === 'string') {
            // //     console.log(dealers[0]);
            // // } else if (typeof dealersInfo[0] === 'string') {
            // //     console.log(dealersInfo[0]);
            // } else {
            //     console.log(dealers[0]);
            //     // console.log(dealersInfo[0]);
            //     // console.log(categories[0]);
            // }
            rl.close();
        });
    });
});
// console.log(dealers[0]);

// var categories = php_parser('categories.php');
// // console.log(categories[0]);
// var Cars = categories[0];
// var Codes = categories[1];
//
// var dealersInfo = php_dealer_parser('dealers.php');
// // console.log(dealersInfo[0]);
//
// // var dealersLen = dealers.length;
// var dealersToUpdate = [];
// dealers.map(function(dealer, index) {
//     var beforeCarsIndex = 500000;
//     var dealerRow = Object.keys(dealers[index]);
//     var dealerInfo = dealers[index][dealerRow[0]];
//     // console.log(dealer);
//     var dealerID = dealerInfo[0][1];
//     // console.log(dealerID);
//     var emails = [];
//     var carCodes = [];
//     dealerInfo.map(function(entry, index) {
//         if (index < beforeCarsIndex) {
//             // console.log(index);
//         } else {
//             // console.log(entry[0]);
//             if (Cars.indexOf(entry[0]) != -1) {
//                 console.log(Codes[Cars.indexOf(entry[0])]);
//             }
//         }
//         switch (entry[0]) {
//             case 'zone manager e-mail':
//                 emails.push(entry[1]);
//                 break;
//             case 'special e-mail cc +':
//                 emails.push(entry[1]);
//                 beforeCarsIndex = index;
//                 break;
//             default:
//                 break;
//         }
//         return entry;
//     });
//     var dealerData = {[dealerID]: {
//         emails_cc: emails,
//         models: carCodes,
//     }};
//     dealersToUpdate.push(dealerData);
//     return dealer;
// });
//
// console.log(dealersToUpdate[0]);
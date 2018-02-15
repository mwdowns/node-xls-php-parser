var fs = require('fs');
var path = require('path');
var php_read = require('php-parser');

var php_parser = new php_read({
    parser: {
        extractDoc: true,
        php7: true
    },
    ast: {
        withPositions: true
    }
});
var phpFile = fs.readFileSync('./dealers.php');
var php = php_parser.parseCode(phpFile);
var stuff = php.children[0].expr.items[1].value.items;
var dealerIDs = [];
var dealerEmails = [];
var dealerCCEmails = [];
var dealerCars = [];
php.children[0].expr.items.map(function(entry) {
    console.log('yo!', entry.value.items[5].value.items);
    dealerIDs.push(entry.value.items[2].value.value);
    dealerEmails.push(entry.value.items[5].value.items); //map this
    dealerCCEmails.push(entry.value.items[6].value.items); //and this
    dealerCars.push(entry.value.items[7].value.items); //and this
    return entry;
});
console.log(dealerIDs);


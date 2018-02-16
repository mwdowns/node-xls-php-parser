var fs = require('fs');
var path = require('path');
var php_read = require('php-parser');

module.exports = function(file) {
    var php_parser = new php_read({
        parser: {
            extractDoc: true,
            php7: true
        },
        ast: {
            withPositions: true
        }
    });
    var phpFile = fs.readFileSync('./' + file);
    var php = php_parser.parseCode(phpFile);
    var stuff = php.children[0].expr.items[1].value.items;
    var dealersInfo = [];
    var dealerCCEmails = [];
    var dealerCars = [];
    php.children[0].expr.items.map(function(entry) {
        // console.log('yo!', entry.value.items[5].value.items);
        var entryID = entry.value.items[2].value.value;
        var entryEmails = [];
        var entryCCEmails = [];
        var entryCars = [];
        entry.value.items[5].value.items.map(function(entry) {
            entryEmails.push(entry.value.value);
            return entry;
        });
        entry.value.items[6].value.items.map(function(entry) {
            entryCCEmails.push(entry.value.value);
            return entry;
        });
        entry.value.items[7].value.items.map(function(entry) {
            entryCars.push(entry.value.value);
            return entry;
        });
        dealersInfo.push([entryID, entryEmails, entryCCEmails, entryCars]);
        return entry;
    });

    return dealersInfo;
};
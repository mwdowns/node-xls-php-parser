var fs = require('fs');
var path = require('path');
var php_check = require('./php_check.js');
var php_read = require('php-parser');
var php_maker = require('./php_dealer_creater.js');

/*This function parses our dealers.php file and extracts the dealers and the info for them including id, email, emailCC, and cars array (the last 3 being what the XLS wants to update).
Parameters => a php file (string)
If error Returns => Array with a single string.
Returns => Array of elements index0 being (string) dealer id, index1 being an array of (strings) emails, index2 being and array of (strings) emails, and index3 being an array of (strings) model ids.
*/

module.exports = function(file) {
    if (!php_check(file)) {
        return ['the dealers.php file you provided, ' + file + ', is not a file or is not an xls file'];
    }
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
    var dealersInfo = [];
    var dealerCCEmails = [];
    var dealerCars = [];
    php.children[0].expr.items.map(function(entry) {
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
    return [dealersInfo, php];
};
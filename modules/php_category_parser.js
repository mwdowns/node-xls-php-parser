var fs = require('fs');
var path = require('path');
var php_check = require('./php_check.js');
var php_read = require('php-parser');

/*This function parses our category_mapping.php file and extracts the cars and mapping keys
Parameters => a php file (string)
If error Returns => Array with a single string.
Returns => Array of {mapping_key: car} objects
*/

module.exports = function(file) {
    if (!php_check(file)) {
        return ['the categories.php file you provided, ' + file + ', is not a file or is not an xls file'];
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
    var categories = php.children[0].expr.items[0].value.items;
    var carsAndCodes = [];
    var cars = [];
    var codes = [];
    categories.map(function(entry) {

        if (entry.key.value > 299999999) {
            codes.push(entry.key.value);
            cars.push((entry.value.items[0].value.value).toLowerCase());
        }
    });
    carsAndCodes.push(cars);
    carsAndCodes.push(codes);

    return carsAndCodes;
};
var xls = require('xlsx');
var xls_check = require('./xls_check.js');

/*This function parses a given xls file (with a known format) and extracts the information in those rows
Parameters => an xls file (string)
If error Returns => Array with a single string.
Returns => Array of objects with keys being row numbers and value being an array of arrays. The arrays follow the pattern index0 is a heading, index1 is value.
*/

module.exports = function(file) {
    if (!xls_check(file)) {
        return ['the dealers.xls file you provided, ' + file + ', is not a file or is not an xls file'];
    }
    var workbook = xls.readFile(file);
    var sheet = workbook.SheetNames[0];
    var data = workbook.Sheets[sheet];
    var xlsHeadings = {};
    var dealersKey = {};
    var dealers = [];
    var row;
    var column;
    for (var cell in data) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if(cell[0] === '!') continue;
        if(cell[1] === '3') xlsHeadings[cell[0]] = data[cell].v;
        if (cell[2]) {
            row = parseInt(cell[1] + cell[2]);
        } else {
            row = parseInt(cell[1]);
        }
        if(row > 3) {
            if (row in dealersKey) {
                column = cell[0];
                var index = (Object.keys(dealersKey).length) - 1;
                dealers[index][row].push([xlsHeadings[column].toLowerCase(), data[cell].v]);
            } else {
                dealersKey[row] = 'pushed';
                column = cell[0];
                dealers.push({[row]: [['dealerID', data[cell].v]]});
            }
        }
    }
    return dealers;
};
var xls = require('js-xlsx');

module.exports = function(file) {
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
                dealers[index][row].push({[xlsHeadings[column]]: data[cell].v});
            } else {
                dealersKey[row] = 'pushed';
                column = cell[0];
                dealers.push({[row]: [{[xlsHeadings[column]]: data[cell].v}]});
            }
        }
    }
    return dealers;
};
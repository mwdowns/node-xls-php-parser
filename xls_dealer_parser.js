var xls = require('js-xlsx');

var workbook = xls.readFile('./dealers.xls');

var sheet = workbook.SheetNames[0];
var data = workbook.Sheets[sheet];
// console.log(data);
var dataLen = Object.keys(data).length;
var rows = parseInt((Object.keys(data)[dataLen - 3]).replace(/\D+/g, ''));
var xlsHeadings = [];
var dealer = {};
var dealers = {};
var dealers2 = [];
for (var cell in data) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(cell[0] === '!') continue;
    if(cell[1] === '3') xlsHeadings.push({[cell[0]]: {[data[cell].v]: null}});
    if (cell[2]) {
        var intCell = parseInt(cell[1] + cell[2]);
    } else {
        var intCell = parseInt(cell[1]);
    }
    if(intCell > 3) {
        if (intCell in dealers) {
            console.log(intCell);
            var column = cell[0];
            // console.log(data[cell].v);
            // console.log(dealers[intCell][counter]);
            var key = Object.keys(dealers[intCell][counter]);
            dealers[intCell][counter][key[0]] = data[cell].v;
            counter++;
        } else {
            var counter = 1;
            dealers[intCell] = xlsHeadings;
            var key = Object.keys(dealers[intCell][0].A);
            dealers[intCell][0].A[key[0]] = data[cell].v;
            dealers2.push({[intCell]: null});
        }
    }
}
console.log(dealers2);
// for (var x in dealers) {
//     console.log(dealers[x][0]);
// }
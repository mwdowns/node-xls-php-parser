var xls = require('js-xlsx');

var workbook = xls.readFile('./dealers.xls');

var sheet = workbook.SheetNames[0];
var data = workbook.Sheets[sheet];
var dataLen = Object.keys(data).length;
var rows = parseInt((Object.keys(data)[dataLen - 3]).replace(/\D+/g, ''));
var xlsHeadings = [];
// var xls_arr = [];
var dealers = [];
for (var z in data) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue;
    if(z[1] === '3') xlsHeadings.push({[z[0]]: {[data[z].v]: null}});
    intZ = parseInt(z[1]);
    console.log('here', intZ);
    if(intZ > 3) {
        var cellRow = 4;
        if (intZ > cellRow) {
            cellRow = intZ;
        }
        console.log(z[0]);
        console.log(cellRow);
    }
    // if (parseInt(z[1]) > 3) {
    //     console.log(z[1], ': greater and headerlen: ', values.length);
    // }
    // console.log(z + "=" + JSON.stringify(data[z].v));
}

// for (var i = rows; i > 3; i--) {
//     for (var z in data) {
//         if(z[1] === i.toString()) dealers.push({[i]: {[z[0]]: data[z].v}});
//     }
// }
console.log(xlsHeadings);
// console.log(xlsHeadings[0], ' : ', dealers[0]);
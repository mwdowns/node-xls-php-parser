var xls = require('js-xlsx');

var workbook = xls.readFile('./dealers.xls');

var sheet = workbook.SheetNames[0];
var data = workbook.Sheets[sheet];
var dataLen = Object.keys(data).length;
console.log(Object.keys(data)[dataLen - 3]);
var values = [];
var xls_arr = [];
for (var z in data) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue;
    if(z[1] === '3') values.push({[z[0]]: {[data[z].v]: null}});
    // if (parseInt(z[1]) > 3) {
    //     console.log(z[1], ': greater and headerlen: ', values.length);
    // }
    // console.log(z + "=" + JSON.stringify(data[z].v));
}
console.log(values);
var dealersToUpdate = [];

function emailsAndCarCodeCreator(categories, dealerInfo, beforeCarsIndex) {
    var Cars = categories[0];
    var Codes = categories[1];
    var emails = [];
    var carCodes = [];
    dealerInfo.map(function(entry, index) {
        if (index > beforeCarsIndex && Cars.indexOf(entry[0]) != -1) {
            carCodes.push(Codes[Cars.indexOf(entry[0])]);
        }
        switch (entry[0]) {
            case 'zone manager e-mail':
                emails.push(entry[1]);
                break;
            case 'special e-mail cc +':
                emails.push(entry[1]);
                beforeCarsIndex = index;
                break;
            default:
                break;
        }
        return entry;
    });
    return [emails, carCodes];
}

module.exports = function(categories, dealersXLSInfo) {
	dealersXLSInfo.map(function(dealer, index) {
        var beforeCarsIndex = 500000;
        var dealerRow = Object.keys(dealersXLSInfo[index]);
        var dealerInfo = dealersXLSInfo[index][dealerRow[0]];
        var dealerID = dealerInfo[0][1];
        var emailsAndCarCodes = emailsAndCarCodeCreator(categories, dealerInfo, beforeCarsIndex);
        var dealerData = {[dealerID]: {
            emails_cc: emailsAndCarCodes[0],
            models: emailsAndCarCodes[1],
        }};
        dealersToUpdate.push(dealerData);
        return dealer;
    });
    return dealersToUpdate;
};
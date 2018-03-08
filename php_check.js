/*
Helper function to check that an php file was given.
Paramterss => String file name.
Returns => boolean (true if the file is php, false if not).
*/

module.exports = function(file) {
	var extension = file.match(/\.[0-9a-z]+$/);
    if (!extension || extension[0] !== '.php') {
        return false;
    }
    return true;
};
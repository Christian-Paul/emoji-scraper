var casper = require('casper').create();
var fs = require('fs');
var emojis;

function getEmojis() {
    var emojis = document.querySelectorAll('body > div.container > div > div > table:nth-child(4) > tbody > tr');

    return Array.prototype.map.call(emojis, function (e) {

    	var unicodeContainer = e.querySelectorAll('td:nth-child(4) > a');

    	var unicodes = Array.prototype.map.call(unicodeContainer, function(item) {
			return item.textContent
    	})

        return ({
        	name: e.querySelector('td:nth-child(2) > a').textContent,
        	unicodes: unicodes
        })
    });
}

casper.start('http://www.fileformat.info/info/emoji/list.htm');

casper.then(function () {
    emojis = this.evaluate(getEmojis);
});

casper.run(function () {
    fs.write('data.json', JSON.stringify(emojis, null, '\t'));

    casper.done();
});
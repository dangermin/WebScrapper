var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var app = express();

app.get('/scrape', function(req, res) {
    // Scrape section
    url = 'https://origin-web-scraping.herokuapp.com/'

    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            //Cheerio to return html and give jQuery fnct
            var $ = cheerio.load(html);

            // Define var(s) to capture
            var name, imageUrl, author, price;
            var json = { name: "", imageUrl: "", author: "", price: "" };

            // Use div class for starting point
            $('.panel-body').each(function(i, element) {

                //Traversing DOM for elements
                var data = $(this);
                var name = data.prev().text().trim();
                // console.log(name);
                var imageUrl = data.children('img').attr('src');
                // console.log(imageUrl);
                var author = data.children('p').text();
                // console.log(author);
                var price = data.children('small').text();
                // console.log(price);

                //Storing to JSON file
                json.name = name;
                json.imageUrl = imageUrl;
                json.author = author;
                json.price = price;

                //fs the write to file system
                // Parameter 1 : Created filename
                // Parameter 2 : Calling JSON.stringify to make JSON easier to read
                // Parameter 3 : Callback function for status
                // Parameter 4 : Passing flag 'a', to appended data to end of file.
                fs.appendFile('books.json', JSON.stringify(json, null, 4), { 'flag': 'a' }, function(err) {
                    console.log('File write success!');
                })
            });
        }
        res.send('Check your console!')
    });
})

app.listen('8081')

exports = module.exports = app;
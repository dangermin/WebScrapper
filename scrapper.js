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

                // var list = {};
                // list.push(json);
                // console.log(list);
                fs.appendFile('books.json', JSON.stringify(json, null, 4), { 'flag': 'a' }, function(err) {
                    console.log('File write success!');
                })
            });
            console.log(json);
        }

        //fs the write to file system
        // Parameter 1 : Created filename
        // Parameter 2 : Calling JSON.stringify to make JSON easier to read
        // Parameter 3 : Callback function for status
        // fs.appendFile('books.json', JSON.stringify(json, null, 4), {'flag':'a'}, function(err){
        // 	console.log('File write success!');
        // })
        res.send('Check your console!')
    });
})

app.listen('8081')

console.log('8081');

exports = module.exports = app;

// request('https://origin-web-scraping.herokuapp.com/', function(error, response, html) {
//     if (!error && response.statusCode == 200) {
//         var $ = cheerio.load(html);
//         console.log(html);
//         $('.panel-body').each(function(i, element) {
//             var data = $(this);
//             var name = data.prev().text();
//             console.log(name);
//             var imageUrl = data.children('img').attr('src');
//             console.log(imageUrl);
//             var author = data.children('p').text();
//             console.log(author);
//             var price = data.children('small').text();
//             console.log(price);
//         });
//     }
// });


// <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
//                 <div class="panel panel-default">
//                     <div class="panel-heading">
//                         Web Development with Node and Express
//                     </div>
//                     <div class="panel-body">
//                         <img class="img-responsive" src="https://images-na.ssl-images-amazon.com/images/I/51L%2Biq%2Bh6EL._AC_UY270_.jpg" alt="">
//                         <p>Ethan Brown</p>
//                         <small class="green">$16.49</small>
//                     </div>
//                     <div class="panel-footer clearfix">
//                         <button class="btn btn-primary ">Buy Now</button>
//                     </div>
//                 </div>
//             </div>

// "name": "Programming Pearls",
// "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41KHvfm4-fL._AC_UY270_.jpg",
// "author": "Jon Bentley",
// "price": "$28.79"

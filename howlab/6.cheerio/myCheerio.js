const cheerio = require('cheerio');


const $ = cheerio.load(`<ul id="fruits">
    <li class= "apple" >Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
</ul > `);


var a = $('.apple', '#fruits').text()
//=> Apple

var b = $('ul .pear').attr('class')
//=> pear

var c = $('ul').html()
//=> Orange

console.log(a)
console.log(b)
console.log(c)
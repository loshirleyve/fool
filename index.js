var express = require('express');
var app = express();
var path = require('path');

//设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.locals.basedir = app.get('views');
app.set("view engine", "jade");

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  // res.type('text/plain');
  // res.send('Mdadowlark Travel');
  res.render('home');
});


var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];
app.get('/about', function(req, res){
  // res.type('text/plain');
  // res.send('About Meadowlark Travel');
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  console.info(randomFortune);
  res.render('about', {fortune:randomFortune});
});

app.use(function(req, res){
  // res.type('text/plain');
  res.status(404);
  // res.send('404 - Not Found');
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  // res.type('text/plain');
  res.status(500);
  // res.send('500 - Server Error');
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:'+app.get('port') + ';press Ctrl-C to terminate.');
});











// var http = require('http'),
//         fs  = require('fs');
//
// function serveStaticFile(res, path, contentType, responseCode){
//   if(!responseCode) responseCode = 200;
//   fs.readFile(__dirname + path, function(err, data){
//     if(err){
//       res.writeHead(500, {'Content-Type':'text/plain'});
//       res.end('500 - Internal Error');
//     }else {
//       res.writeHead(responseCode, {'content-Type':contentType});
//       res.end(data);
//     }
//   });
// }
//
// http.createServer(function(req, res){
//   var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
//   switch (path) {
//     case '':
//       serveStaticFile(res, '/public/home.html', 'text/html');
//       break;
//     case '/about':
//       serveStaticFile(res, '/public/about.html', 'text/html');
//       break;
//       case 'img/logo.jpg':
//         serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
//         break;
//     default:
//       // res.writeHead(404, {'Content-Type':'text/plain'});
//       // res.end('Not Found');
//       serveStaticFile(res, '/public/404.html', 'text/html', 404);
//       break;
//   }
// }).listen(3000);
//
// console.log('Server started on localhost:3000; press Ctrl-C to terminate...');

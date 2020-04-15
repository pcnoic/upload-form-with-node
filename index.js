const http = require('http');
const hostname = '127.0.0.1';


var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var tag = req.query.tag; 
      var newpath = "audio/" + tag;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded! Press <a href="http://devalexiou.com:8080">here </a> to upload more');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="text" name="tag"><br>')
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
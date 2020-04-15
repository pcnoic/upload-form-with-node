const http = require('http');
const hostname = '127.0.0.1';


var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var tag = fields.tag; 
      var newpath = "/pets/upload-form-with-node/audio/ " + tag + "-" + Date.now() + ".wav";
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('File uploaded! <br>')
        res.write('<a href="http://devalexiou.com:8080">Upload more</a>');
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
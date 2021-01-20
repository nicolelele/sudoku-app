const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({
    uploadDir: './src/uploads'
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/upload', multipartMiddleware, (req, res) => {
  if(req.files) {
    fs.rename(req.files.uploads[0].path, 'src/uploads/uploadedFile.json', () => {
    });
  }
  res.status(200).send('uploaded!');
});

app.get('/api/data', (req, res) => {
  let data = fs.readFileSync('./src/uploads/uploadedFile.json');
  res.send(data);
});

app.listen(port, () => console.log(`listening on port ${port}!`))

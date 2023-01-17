var connect = require('connect');
var serveStatic = require('serve-static');
var { resolve } = require('path');


connect()
  .use(serveStatic(resolve(__dirname, '../static')))
  .listen(8080, () => console.log('Server running on 8080...'));

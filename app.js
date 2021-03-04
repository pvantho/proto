const koa = require('koa');
const path = require('path')
const Router = require('koa-router');
const serve = require('koa-static');
const render = require('koa-ejs')
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const index = require('./api/index');

const winston = require('./config/winston');

const router = new Router();

winston.log('info', 'Resto is starting ..... ');
const app = new koa();


//app.use(logger())

app.use(cors());
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});
app.use(bodyParser())
app.use(views(path.join(__dirname, 'views')));

app
  .use(router.routes())
  .use(router.allowedMethods());


app.keys = ['secret'];

index.use(router);


app.use(serve('.'));
app.use(serve('dist/eateries'));


/*
app.listen(3330, function(){
  console.log('Server running on http://localhost:3330')
});
*/


module.exports = app;

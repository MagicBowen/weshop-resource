const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();


// log middleware
app.use(async (ctx, next) => {
    console.log(`process request for '${ctx.request.method} ${ctx.request.url}' ...`);
    var start = new Date().getTime();
    await next();
    var execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`); 
    console.log(`... response in duration ${execTime}ms`);
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(8080, '0.0.0.0');
console.log('server started at 0.0.0.0:8080...');
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const model = require('./model');

const staticFiles = require('./static-files');

const app = new Koa();

// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true;


// log middleware
app.use(async (ctx, next) => {
    console.log(`process request for '${ctx.request.method} ${ctx.request.url}' ...`);
    var start = new Date().getTime();
    await next();
    var execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`); 
    console.log(`... response in duration ${execTime}ms`);
});

// deal static files:
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add model to ctx:
app.use(model('models'));

process.on('uncaughtException',function(err){
        console.log('uncaughtException-->'+err.stack+'--'+new Date().toLocaleDateString()+'-'+new Date().toLocaleTimeString());
        process.exit();
    });

// add controllers:
app.use(controller());

app.listen(8080, '0.0.0.0');
console.log('server started at 0.0.0.0:8080...');
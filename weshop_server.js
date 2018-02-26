const Koa = require('koa');
const fs = require('mz/fs');
const router = require('koa-router')();
const app = new Koa();


// log request URL:
app.use(async (ctx, next) => {
    console.log(`process request for '${ctx.request.method} ${ctx.request.url}' ...`);
    var start = new Date().getTime();
    await next();
    var execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`); 
    console.log(`... response in duration ${execTime}ms`);
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Welcome to westore!</h1>`;
});

async function fillImageToCtx(ctx, image) {
    if (await fs.exists(image)) {
        ctx.response.type = "image/jpg";
        ctx.response.body = await fs.readFile(image);
    } else {
        ctx.response.status = 404;
    }    
}

router.get('/image', async (ctx, next) => {
    var name = ctx.query.name;
    var image = `./static/pictures/images/${name}`;
    await fillImageToCtx(ctx, image);
});

router.get('/size/image', async (ctx, next) => {
    var relation = ctx.query.relation;
    var sex = ctx.query.sex;
    var type = ctx.query.type;
    var image = `./static/pictures/size_relation/${sex}/${type}/${relation}`;
    await fillImageToCtx(ctx, image);
});

router.get('/product/image', async (ctx, next) => {
    var productId = ctx.query.product;
    var pictureName = ctx.query.picture;
    var image = `./static/pictures/products/${productId}/target/${pictureName}`;
    await fillImageToCtx(ctx, image);
});

router.get('/product/cover', async (ctx, next) => {
    var productId = ctx.query.product;
    var image = `./static/pictures/wechat_cover/${productId}-l.png`;
    await fillImageToCtx(ctx, image);
});

// add router
app.use(router.routes());

app.listen(8080, '0.0.0.0');
console.log('server started at 0.0.0.0:8080...');
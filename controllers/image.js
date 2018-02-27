const fs = require('mz/fs');

const static_picture_path = 'static/pictures'

async function fillImageToCtx(ctx, image) {
    if (await fs.exists(image)) {
        ctx.response.type = "image/jpg";
        ctx.response.body = await fs.readFile(image);
    } else {
        ctx.response.status = 404;
    }    
}

var getImage = async (ctx, next) => {
    var name = ctx.query.name;
    var image = `${static_picture_path}/images/${name}`;
    await fillImageToCtx(ctx, image);
};

var getSizeImage = async (ctx, next) => {
    var relation = ctx.query.relation;
    var sex = ctx.query.sex;
    var type = ctx.query.type;
    var image = `${static_picture_path}/size_relation/${sex}/${type}/${relation}`;
    await fillImageToCtx(ctx, image);
};

var getProductImage = async (ctx, next) => {
    var productId = ctx.query.product;
    var pictureName = ctx.query.picture;
    var image = `${static_picture_path}/products/${productId}/target/${pictureName}`;
    await fillImageToCtx(ctx, image);
};

var getProductCover = async (ctx, next) => {
    var productId = ctx.query.product;
    var image = `${static_picture_path}/wechat_cover/${productId}-l.png`;
    await fillImageToCtx(ctx, image);
};

module.exports = {
    'GET /image': getImage,
    'GET /size/image' : getSizeImage,
    'GET /product/image' : getProductImage,
    'GET /product/cover' : getProductCover
};
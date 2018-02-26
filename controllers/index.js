var index = async (ctx, next) => {
    ctx.response.body = `<h1>Welcome to westore!</h1>`;
};

module.exports = {
    'GET /': index
};
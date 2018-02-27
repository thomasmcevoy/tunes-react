// const index = require('./index.html')
const Koa = import('koa')
const app = new Koa()

app.use(require('koa-static')('/home/thomas/tunes/build'));
// app.use(ctx => ctx.body = index)
app.listen(3002)
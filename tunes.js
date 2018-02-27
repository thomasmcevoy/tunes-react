const Koa = require('koa')
const app = new Koa()

app.use(require('koa-static')('/home/thomas/tunes/build'))
app.listen(3002)
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

// app.use(serve(__dirname + '/build'))

app.use(async ctx => {
  ctx
  ctx.request
  ctx.response
})

app.listen(3001)
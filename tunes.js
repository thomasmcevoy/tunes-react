const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

// app.use(serve(__dirname + '/build'))

app.use(async ctx => {
  console.log(ctx)
  console.log(ctx.request)
  console.log(ctx.response)
})

app.listen(3001)
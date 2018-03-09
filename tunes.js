const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

// This works
// app.use(ctx => {
//   ctx.body = 'Hello Koa'
// })

// This doesn't work
app.use(serve(__dirname + '/build'))

app.listen(3001)

console.log('listening on port 3001')
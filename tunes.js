'use strict'

const Koa = require('koa')
const app = new Koa()

app.use(require('koa-static')('./build'))
app.listen(3001)
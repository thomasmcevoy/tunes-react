'use strict'

const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
console.log(__dirname)
app.use(serve(__dirname + '/build'))

app.listen(3001)
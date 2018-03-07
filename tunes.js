'use strict'

const Koa = require('koa')
const app = new Koa()
const port = 3001

app.use(Server(__dirname + '/build'))

app.listen(port)
const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/blogs', { target: 'http://localhost:8000' }))
}

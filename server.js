const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3004
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })

    // server.get('/b', (req, res) => {
    //   return app.render(req, res, '/a', req.query)
    // })

    server.get('/article/:id', (req, res) => {

      app.render(req, res, '/article', { id: req.params.id })
      
    })


    server.get('/edit_content/:id', (req, res) => {

      app.render(req, res, '/edit_content', { id: req.params.id })
      
    })

    server.get('/edit_writing/:id', (req, res) => {
      console.log('new_writing', req.params.id)
      app.render(req, res, '/edit_writing', { id: req.params.id })
      
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

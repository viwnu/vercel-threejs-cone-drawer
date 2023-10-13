import express from 'express'
import bodyParser from "body-parser"
import cors from 'cors'
// import { createProxyMiddleware } from 'http-proxy-middleware'
import os from 'os'
import calculateTriangles from './calculateTriangles'

const app = express()
const port = 8000

app.use(cors({
  exposedHeaders: '*'
}))

// app.use('/api', createProxyMiddleware({ target: `http://localhost:${port}`, changeOrigin: true }))


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('../dist'))

app.post('/api', (req, res) => {
  console.log('req.body: ', req.body)
  const dataToSend = calculateTriangles(req.body)
  res.send(dataToSend)
})

app.listen(port, () => {
  console.log(`Server running at http://${os.hostname()}:${port}/`)
})
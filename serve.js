const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })

  let list = []
  for (let i = 0; i < 20000; i++) {
    list.push({
      src: './cat.jpeg',
      text: `小猫咪${i}号`,
      id: i
    })
  }

  const data = JSON.stringify(list)
  res.end(data)
})

server.listen(8000)
import http from 'node:http'

const server = http.createServer((req, res) => {
    console.log('Rodando na porta 3333')
    return res.end('Hello Worldasdasd!')
})

server.listen(3333);
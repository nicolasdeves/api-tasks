/*

Headers     => https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers
Status code => https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

*/

import http from 'node:http'
import { routes } from './routes.js'



const server = http.createServer(async (req, res) => {

    const { method, url } = req

    // console.log(method)
    // console.log(url)

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()) //A função Buffer.concat() é um método que aceita um array de Buffers e concatena todos eles em um único Buffer

    } catch {
        req.body = null
    }
    

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {

        const routeParams = req.url.match(route.path)

        req.params = { ...routeParams.groups } //como o req já tem o body, agora ele terá também os parâmetros da rota

        return route.handler(req, res)
    }


    return res.writeHead(404).end()
})

server.listen(3333);
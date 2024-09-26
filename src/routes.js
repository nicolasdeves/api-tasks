
// Query parameters: URL stateful                     => filtros, paginação /localhost:3333/users?userId=1&name=Nicolas
// Route parameters: Identificação                    => localhost:3333/users/1
// Request body:     Envio de informações; formulário => não fica na URL   


import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')

            return res
                .setHeader('Content-type', 'application/json')
                .end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            const { title, description } = req.body

            const task = ({
                id: randomUUID(),
                title,
                description
            })
            
            database.insert('tasks', task)
    
            res
                .writeHead(201)
                .end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params

            database.delete('tasks', id)
            res
                .writeHead(204)
                .end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params
            const { title, description } = req.body

            database.update('tasks', id, {
                title,
                description
            })
            res
                .writeHead(204)
                .end()
        }
    },

]
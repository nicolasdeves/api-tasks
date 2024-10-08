
// Query parameters: URL stateful                     => filtros, paginação /localhost:3333/users?userId=1&name=Nicolas
// Route parameters: Identificação                    => localhost:3333/users/1
// Request body:     Envio de informações; formulário => não fica na URL   


import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';
import { importCSV } from '../streams/import-csv.js'

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
                description,
                completed_at: null,
                created_at: getCurrentDate(),
                updated_at: null
            })
            
            database.insert('tasks', task)
    
            res
                .writeHead(201)
                .end()
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/import-csv'),
        handler: (req, res) => {
            importCSV()
    
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

            const data = database.select('tasks').find(task => task.id === id)

            database.update('tasks', id, {
                title,
                description,
                completed_at: data.completed_at,
                created_at: data.created_at,
                updated_at: getCurrentDate()
            })
            res
                .writeHead(204)
                .end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/completed'),
        handler: (req, res) => {

            const { id } = req.params

            const data = database.select('tasks').find(task => task.id === id)

            database.update('tasks', id, {
                title: data.title,
                description: data.description,
                completed_at: !data.completed_at ? getCurrentDate() : null,
                created_at: data.created_at,
                updated_at: data.updated_at
            })
            res
                .writeHead(204)
                .end()
        }
    },

]

const getCurrentDate = () => {
    const dateNow = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return dateNow;
}
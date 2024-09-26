import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url) //import.meta.url => retorna o caminho atual deste arquivo

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() =>{
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select (table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert (table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    } 
    
    delete (table, id) {
        console.log('IDDD', id)
        const rowIndex = this.#database[table].findIndex(row => row.id === id) // retorna o índice do primeiro elemento de um array que satisfaça a função de teste fornecida. Caso contrário, retorna -1.

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update (table, id, data) {
        console.log('IDDD', id)
        const rowIndex = this.#database[table].findIndex(row => row.id === id) // retorna o índice do primeiro elemento de um array que satisfaça a função de teste fornecida. Caso contrário, retorna -1.

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
    }
}
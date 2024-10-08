import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath) //o arquivo é lido em formato de stream, ou seja, pedaços do arquivo serão lidos e processados conforme o conteúdo vai sendo recebido.

const csvParse = parse({ //cria uma instância do parser de CSV configurada com algumas opções
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2
})

export async function importCSV() {

    console.log("ENTROU NO IMPORT CSV")

    const linesParsed = stream.pipe(csvParse) //o stream de leitura é conectado ao parser de CSV, que vai transformar os dados em linhas de objetos

    for await (const line of linesParsed) {
        const [title, description] = line

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description
            })
        })
    }
}

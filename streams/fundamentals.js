/*
process.stdin //leitura
    .pipe(process.stdout) //escrita aos poucos (pipe)

*/

/*

EXEMPLO DE STREAMS
NÃO É USADO NA API, FINALIDADE DE ENTENDIMENTO


*/

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {

            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

class NegativeNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))  //callback(error, result) o primeiro parametro é como se fosse a exception
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback) {              //chunk é o dado passado pela stream, um pedaço do total
        //console.log(Number(chunk.toString()) * 10)   //vai mostrar o que recebeu multiplicado por 10
        callback()                                  //vai chamar novamente a funcao
    }
}


new OneToHundredStream()                //readable
    .pipe(new NegativeNumber())         //tranform recebe e enviar dados / intermediário
    .pipe(new MultiplyByTenStream())    //writable
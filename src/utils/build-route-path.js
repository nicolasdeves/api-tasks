export function buildRoutePath(path) {

    const routeRegex = /:([a-zA-Z]+)/g //texto que começa com : com uma ou mais letras globalmente (não para na primeira que achar)
    const pathWithParams = path.replaceAll(routeRegex, '(?<$1>[a-zA-Z0-9\-_]+)') //substitui todos os :letras por ([a-zA-Z0-9]+) ?<$1> => nomeia o grupo de captura com base nos grupos estabelecidos no routeRegex ()
    
    const pathRegex = new RegExp(`^${pathWithParams}`) //cria uma expressão regular que começa e termina com o texto da variável pathWithParams

    return pathRegex
}
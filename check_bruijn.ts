function is(cadena: string, k: number): boolean {
  const visitados: string[] = []
  const longitud = 2 ** k
  for (let i = 0; i < longitud; i++) {
    let pasoi = cadena.slice(i, i + k)
    if (visitados.indexOf(pasoi) >= 0) {
      return false
    }
    visitados.push(pasoi)
  }
  return true
}

if (process.argv.length < 4) {
  console.log('Usage: npx ts-node check_bruijn.ts CADENA_BRUIJN k')
  console.log('Usage: npx ts-node check_bruijn.ts 1000011110100101100 4')
  process.exit(1)
}

const cadena = process.argv[2]
const k = parseInt(process.argv[3])

console.log(is(cadena, k))

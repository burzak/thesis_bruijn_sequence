import * as Huang from './Huang'

function f(arista: Huang.Arista) {
  return arista.join('') + ' (' + Huang.r_diferencia(arista) + '-dif)'
}

function lf(aristas: Huang.Arista[]): string[] {
  return aristas.map(f)
}

function selcor(arista: Huang.Arista, verbose = false) {
  const historial: Huang.Arista[] = []
  let paso_actual = arista
  const k = arista.length
  const n = 2 ** k

  for (let i = 0; i < n + k - 1; i++) {
    historial.push(paso_actual)
    if (verbose) {
      console.log(f(paso_actual))
    }
    paso_actual = Huang.paso_de_bruijn(paso_actual)
  }
  return historial.map((e) => e[k - 1]).join('')
}

if (process.argv.length < 3) {
  console.log('Usage: npx ts-node bruijn.ts 0000')
  console.log('Usage: npx ts-node bruijn.ts 0000 verbose')
  process.exit(1)
}

const arista = process.argv[2]
const verbose = process.argv[3] === 'verbose'

console.log(
  selcor(
    arista.split('').map((e) => (parseInt(e) ? 1 : 0)),
    verbose,
  ),
)

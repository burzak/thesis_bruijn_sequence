import * as Huang from './Huang_paper';


function f(flecha: Huang.Flecha) {
    return flecha.join('') + " (" + Huang.rdiferencia(flecha) + "-dif)";
}

function lf(flechas: Huang.Flecha[]): string[] {
    return flechas.map(f);
}

function selcor(flecha: Huang.Flecha, verbose = false) {
    const historial: Huang.Flecha[] = [];
    let paso_actual = flecha;
    const k = flecha.length;
    const n = 2**k;

    for (let i = 0; i < n + k - 1; i++) {
        historial.push(paso_actual);
        if (verbose) {
            console.log(f(paso_actual));
        }
        paso_actual = Huang.paso_de_bruijn(paso_actual);
    }
    return historial.map(e => e[k-1]).join('');
}

if (process.argv.length < 3) {
    console.log("Usage: npx ts-node bruijn.ts 0000");
    console.log("Usage: npx ts-node bruijn.ts 0000 verbose");
    process.exit(1);
}

const flecha = process.argv[2];
const verbose = process.argv[3] === 'verbose';

console.log(selcor(flecha.split('').map(e => parseInt(e) ? 1 : 0), verbose));

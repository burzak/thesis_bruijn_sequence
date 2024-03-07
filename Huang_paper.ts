import assert from "node:assert";

// define type call flecha that is a array<number>
type Binario = 0 | 1;
type Flecha = Array<Binario>;

function neg(n: Binario) {
    return n === 0 ? 1 : 0;
}

// return the original list of numbers with the negation of the first number appended to the end
function extender(flecha: Flecha): Flecha {
    return [...flecha, neg(flecha[0])];
}

assert(extender([0, 1, 0, 1]).toString() === [0, 1, 0, 1, 1].toString());
assert(extender([1, 0, 1, 0]).toString() === [1, 0, 1, 0, 0].toString());

// removes the first number from the list and appends the negation of the first number to the end
function siguiente(flecha: Flecha): Flecha {
    return extender(flecha).slice(1);
}

assert(siguiente([0, 1, 0, 1]).toString() === [1, 0, 1, 1].toString());
assert(siguiente([1, 0, 1, 0]).toString() === [0, 1, 0, 0].toString());


function ccr(flecha: Flecha): Flecha[] {
    const ccr_list: Flecha[] = [];

    let actual = flecha;

    while (!ccr_list.map(e => e.toString()).includes(actual.toString())) {
        ccr_list.push(actual);
        actual = siguiente(actual);
    }

    return ccr_list;
}
const ccr_test = ccr([0, 0, 0, 0]);
assert(ccr_test.length === 8);
assert(ccr_test[0].toString() === [0, 0, 0, 0].toString());
assert(ccr_test[4].toString() === [1, 1, 1, 1].toString());
assert(ccr_test[7].toString() === [1, 0, 0, 0].toString());


function rotacion_izq(flecha: Flecha): Flecha {
    return [... flecha.slice(1), flecha[0]];
}

assert(rotacion_izq([0, 1, 0, 1]).toString() === [1, 0, 1, 0].toString());
assert(rotacion_izq([1, 0, 1, 0]).toString() === [0, 1, 0, 1].toString());
assert(rotacion_izq([0, 0, 0, 0]).toString() === [0, 0, 0, 0].toString());
assert(rotacion_izq([1, 1, 1, 1]).toString() === [1, 1, 1, 1].toString());

function rotacion_der(flecha: Flecha): Flecha {
    return [flecha[flecha.length-1], ...flecha.slice(0, -1)];
}

assert(rotacion_der([0, 1, 0, 1]).toString() === [1, 0, 1, 0].toString());
assert(rotacion_der([1, 0, 1, 0]).toString() === [0, 1, 0, 1].toString());
assert(rotacion_der([0, 0, 0, 0]).toString() === [0, 0, 0, 0].toString());
assert(rotacion_der([1, 1, 1, 1]).toString() === [1, 1, 1, 1].toString());


function binary_to_decimal(flecha: Flecha): number {
    return parseInt(flecha.join(''), 2);
}

assert(binary_to_decimal([0, 1, 0, 1]) === 5);
assert(binary_to_decimal([1, 0, 1, 0]) === 10);
assert(binary_to_decimal([0, 0, 0, 0]) === 0);
assert(binary_to_decimal([1, 1, 1, 1]) === 15);
assert(binary_to_decimal([1, 0, 0, 0, 0]) === 16);
assert(binary_to_decimal([1, 0, 0, 0, 1]) === 17);
assert(binary_to_decimal([1, 0, 0, 1, 0]) === 18);


function rdiferencia(flecha: Flecha): number {
    const extendida = extender(flecha);
    let diferencia = 0;
    for (let i = 0; i < flecha.length; i++) {
        if (extendida[i] !== extendida[i+1]) {
            diferencia += 1;
        }
    }
    return diferencia;
}

assert(rdiferencia([0, 1, 0, 1]) === 3);
assert(rdiferencia([1, 0, 1, 0]) === 3);
assert(rdiferencia([0, 0, 0, 0]) === 1);
assert(rdiferencia([1, 1, 1, 1]) === 1);
assert(rdiferencia([1, 0, 0, 0, 0]) === 1);
assert(rdiferencia([1, 0, 0, 0, 1]) === 3);
assert(rdiferencia([1, 0, 1, 0, 1]) === 5);
assert(rdiferencia([1,0,0,1,0]) == 3);

function flecha_mas_grande_en_decimal(flechas: Flecha[]): Flecha {
    return flechas.reduce((a, b) => binary_to_decimal(a) > binary_to_decimal(b) ? a : b);
}

assert(flecha_mas_grande_en_decimal([[0, 1, 0, 1]]).toString() === [0, 1, 0, 1].toString());
assert(flecha_mas_grande_en_decimal([[0, 1, 0, 1], [1, 0, 1, 0], [0, 0, 0, 0]]).toString() === [1, 0, 1, 0].toString());
assert(flecha_mas_grande_en_decimal([[0, 1, 0, 1], [1, 0, 1, 0], [0, 0, 0, 0], [1, 1, 1, 1]]).toString() === [1, 1, 1, 1].toString());
assert(flecha_mas_grande_en_decimal([[0, 1, 0, 1], [1, 0, 1, 0], [0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1]]).toString() === [1, 0, 1, 0, 1].toString());

function flecha_distinguida(ccr: Flecha[]) {
    let posible_distinguida = ccr[0];
    
    const flechas_rotadas_derecha = ccr.map(rotacion_der);

    const flechas_menor_rdif = flechas_rotadas_derecha.filter(e => rdiferencia(e) < rdiferencia(posible_distinguida));
    if (flechas_menor_rdif.length) {
        return rotacion_izq(flecha_mas_grande_en_decimal(flechas_menor_rdif));
    }

    const flechas_mismo_rdif = flechas_rotadas_derecha.filter(e => rdiferencia(e) === rdiferencia(posible_distinguida));
    if (flechas_mismo_rdif.length) {
        return rotacion_izq(flecha_mas_grande_en_decimal(flechas_mismo_rdif));
    }
}


function paso_de_bruijn(actual: Flecha): Flecha {
    const sig = siguiente(actual);
    const salida = rotacion_izq(actual);
    const ccr_actual = ccr(actual);

    // check if salida is in ccr_actual
    if (ccr_actual.map(e => e.toString()).includes(salida.toString())) {
        return sig;
    }

    // evaluo si salida es la flecha distinguida de del CCR correspondiente a salida
    const ccr_salida = ccr(salida);
    const ccr_salida_entrada_distinguida = flecha_distinguida(ccr_salida);

    // check if ccr_salida_entrada_distinguida is a valid flecha and if it is equal to salida
    if (ccr_salida_entrada_distinguida && ccr_salida_entrada_distinguida.toString() === salida.toString()) {
        return salida;
    }

    const ccr_actual_entrada_distinguida = flecha_distinguida(ccr_actual);
    if (ccr_actual_entrada_distinguida && ccr_actual_entrada_distinguida.toString() === sig.toString()) {
        return salida
    }

    return sig;
}


export {
    Flecha,
    Binario,
    neg,
    extender,
    siguiente,
    ccr,
    rotacion_izq,
    rotacion_der,
    binary_to_decimal,
    rdiferencia,
    flecha_mas_grande_en_decimal,
    flecha_distinguida,
    paso_de_bruijn,
};
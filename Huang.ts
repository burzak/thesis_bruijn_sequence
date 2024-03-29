export type Binario = 0 | 1
export type Arista = Array<Binario>

function neg(n: Binario) {
  return n === 0 ? 1 : 0
}

function extender(arista: Arista): Arista {
  return [...arista, neg(arista[0])]
}

function siguiente(arista: Arista): Arista {
  return extender(arista).slice(1)
}

function ccr(arista: Arista): Arista[] {
  const ccr_list: Arista[] = []

  let actual = arista

  while (!ccr_list.map((e) => e.toString()).includes(actual.toString())) {
    ccr_list.push(actual)
    actual = siguiente(actual)
  }

  return ccr_list
}

function rotacion_izq(arista: Arista): Arista {
  return [...arista.slice(1), arista[0]]
}

function rotacion_der(arista: Arista): Arista {
  return [arista[arista.length - 1], ...arista.slice(0, -1)]
}

function binario_a_decimal(arista: Arista): number {
  return parseInt(arista.join(''), 2)
}

function r_diferencia(arista: Arista): number {
  const extendida = extender(arista)
  let diferencia = 0
  for (let i = 0; i < arista.length; i++) {
    if (extendida[i] !== extendida[i + 1]) {
      diferencia += 1
    }
  }
  return diferencia
}

function arista_mas_grande_en_decimal(aristas: Arista[]): Arista {
  return aristas.reduce((a, b) => (binario_a_decimal(a) > binario_a_decimal(b) ? a : b))
}

function arista_distinguida(ccr: Arista[]) {
  const r_diferencia_ccr_actual = r_diferencia(ccr[0])

  // todas las posibles formas de entrar a este CCR
  const aristas_rotadas_derecha = ccr.map(rotacion_der)

  const aristas_menor_rdif = aristas_rotadas_derecha.filter((e) => r_diferencia(e) < r_diferencia_ccr_actual)
  if (aristas_menor_rdif.length) {
    return arista_mas_grande_en_decimal(aristas_menor_rdif.map(rotacion_izq))
  }

  const aristas_mismo_rdif = aristas_rotadas_derecha.filter((e) => r_diferencia(e) === r_diferencia_ccr_actual)
  if (aristas_mismo_rdif.length) {
    return arista_mas_grande_en_decimal(aristas_mismo_rdif.map(rotacion_izq))
  }
}

function paso_de_bruijn(actual: Arista): Arista {
  const sig = siguiente(actual)
  const salida = rotacion_izq(actual)
  const ccr_actual = ccr(actual)

  // chequear si la salida es parte del CCR actual
  if (ccr_actual.map((e) => e.toString()).includes(salida.toString())) {
    return sig
  }

  // evaluo si salida es la arista distinguida de del CCR correspondiente a salida
  const ccr_salida = ccr(salida)
  const ccr_salida_arista_distinguida = arista_distinguida(ccr_salida)

  // chequear si ccr_salida_arista_distinguida no esta vacia y es igual a la salida
  if (ccr_salida_arista_distinguida && ccr_salida_arista_distinguida.toString() === salida.toString()) {
    return salida
  }

  const ccr_actual_arista_distinguida = arista_distinguida(ccr_actual)
  if (ccr_actual_arista_distinguida && ccr_actual_arista_distinguida.toString() === sig.toString()) {
    return salida
  }

  return sig
}

export {
  neg,
  extender,
  siguiente,
  ccr,
  rotacion_izq,
  rotacion_der,
  binario_a_decimal,
  r_diferencia,
  arista_mas_grande_en_decimal,
  arista_distinguida,
  paso_de_bruijn,
}

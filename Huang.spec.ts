// import assert from "node:assert";
import assert from 'assert'
import * as Huang from './Huang'

assert(Huang.extender([0, 1, 0, 1]).toString() === [0, 1, 0, 1, 1].toString())
assert(Huang.extender([1, 0, 1, 0]).toString() === [1, 0, 1, 0, 0].toString())

assert(Huang.siguiente([0, 1, 0, 1]).toString() === [1, 0, 1, 1].toString())
assert(Huang.siguiente([1, 0, 1, 0]).toString() === [0, 1, 0, 0].toString())

const ccr_test = Huang.ccr([0, 0, 0, 0])
assert(ccr_test.length === 8)
assert(ccr_test[0].toString() === [0, 0, 0, 0].toString())
assert(ccr_test[4].toString() === [1, 1, 1, 1].toString())
assert(ccr_test[7].toString() === [1, 0, 0, 0].toString())

assert(Huang.rotacion_izq([0, 1, 0, 1]).toString() === [1, 0, 1, 0].toString())
assert(Huang.rotacion_izq([1, 0, 1, 0]).toString() === [0, 1, 0, 1].toString())
assert(Huang.rotacion_izq([0, 0, 0, 0]).toString() === [0, 0, 0, 0].toString())
assert(Huang.rotacion_izq([1, 1, 1, 1]).toString() === [1, 1, 1, 1].toString())

assert(Huang.rotacion_der([0, 1, 0, 1]).toString() === [1, 0, 1, 0].toString())
assert(Huang.rotacion_der([1, 0, 1, 0]).toString() === [0, 1, 0, 1].toString())
assert(Huang.rotacion_der([0, 0, 0, 0]).toString() === [0, 0, 0, 0].toString())
assert(Huang.rotacion_der([1, 1, 1, 1]).toString() === [1, 1, 1, 1].toString())

assert(Huang.binario_a_decimal([0, 1, 0, 1]) === 5)
assert(Huang.binario_a_decimal([1, 0, 1, 0]) === 10)
assert(Huang.binario_a_decimal([0, 0, 0, 0]) === 0)
assert(Huang.binario_a_decimal([1, 1, 1, 1]) === 15)
assert(Huang.binario_a_decimal([1, 0, 0, 0, 0]) === 16)
assert(Huang.binario_a_decimal([1, 0, 0, 0, 1]) === 17)
assert(Huang.binario_a_decimal([1, 0, 0, 1, 0]) === 18)

assert(Huang.r_diferencia([0, 1, 0, 1]) === 3)
assert(Huang.r_diferencia([1, 0, 1, 0]) === 3)
assert(Huang.r_diferencia([0, 0, 0, 0]) === 1)
assert(Huang.r_diferencia([1, 1, 1, 1]) === 1)
assert(Huang.r_diferencia([1, 0, 0, 0, 0]) === 1)
assert(Huang.r_diferencia([1, 0, 0, 0, 1]) === 3)
assert(Huang.r_diferencia([1, 0, 1, 0, 1]) === 5)
assert(Huang.r_diferencia([1, 0, 0, 1, 0]) == 3)

assert(Huang.arista_mas_grande_en_decimal([[0, 1, 0, 1]]).toString() === [0, 1, 0, 1].toString())
assert(
  Huang.arista_mas_grande_en_decimal([
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
  ]).toString() === [1, 0, 1, 0].toString(),
)
assert(
  Huang.arista_mas_grande_en_decimal([
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ]).toString() === [1, 1, 1, 1].toString(),
)
assert(
  Huang.arista_mas_grande_en_decimal([
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
  ]).toString() === [1, 0, 1, 0, 1].toString(),
)

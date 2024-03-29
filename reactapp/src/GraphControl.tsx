import { MutableRefObject, useRef, useState } from 'react'
import { Network } from 'vis-network'
import { Binario, Arista, ccr, paso_de_bruijn } from './Huang'
import * as CONSTANTS from './constants'
import './GraphControl.css'
import vis from 'vis-network/declarations/index-legacy-bundle'

// create my own type called MyNetwork by extending Network and adding body: any as a property
export declare type MyNetwork = Network & { body: any }

export declare type GraphControlType = {
  visgraph: React.MutableRefObject<MyNetwork | null>
}

const toArista = (e: string) => {
  return e.split('').map((n) => parseInt(n) as Binario)
}

export const GraphControl = ({ visgraph }: GraphControlType) => {
  const [startingEdge, setStartingEdge] = useState('')
  const [currentEdge, setCurrentEdge] = useState([] as Arista)

  const stepHistory = useRef<Arista[]>([])
  const physicsInGraph = useRef<boolean>(true)
  const [showGraphFlag, setShowGraphFlag] = useState(false)
  const [drawFullGraphFlag, setDrawFullGraphFlag] = useState(false)
  const [graphModeFlag, setGraphModeFlag] = useState('show_ccr')

  const nextButton = () => {
    markVisited(currentEdge, visgraph)
    // const nextStep = siguiente(currentEdge)
    const nextStep = paso_de_bruijn(currentEdge)
    drawEdge(nextStep, visgraph)
    setCurrentEdge(nextStep)
    stepHistory.current.push(nextStep)
    markHighlight(nextStep, visgraph)
  }

  const prevButton = () => {
    if (stepHistory.current.length == 0) {
      return
    }
    const last = stepHistory.current.pop() as Arista
    markUnvisited(last, visgraph)
    setCurrentEdge(stepHistory.current[stepHistory.current.length - 1])
    markHighlight(stepHistory.current[stepHistory.current.length - 1], visgraph)
  }

  const borrar = () => {
    visgraph.current?.selectNodes(visgraph.current?.body?.data.nodes.getIds())
    visgraph.current?.deleteSelected()
    setStartingEdge('')
    setShowGraphFlag(false)
    stepHistory.current = []
    if (!physicsInGraph.current) {
      togglePhysics()
    }
  }

  const togglePhysics = () => {
    physicsInGraph.current = !physicsInGraph.current
    visgraph.current?.setOptions({ physics: { enabled: physicsInGraph.current } })
  }

  const showGraph = () => {
    const currentEdge = toArista(startingEdge)
    setShowGraphFlag(true)
    setCurrentEdge(currentEdge)
    switch (graphModeFlag) {
      case 'show_ccr':
        drawCCRIntoGraph(currentEdge, visgraph)
        break
      case 'show_empty':
        drawOnlyFirstNode(currentEdge, visgraph)
        break
      case 'show_full':
        drawFullGraph(currentEdge, visgraph)
        break
    }
    markVisited(currentEdge, visgraph)
  }

  return (
    <div className="graph-control">
      <div>
        <p>Herramienta para visualizar un grafo de Bruijn de orden k-1</p>
        <input
          type="text"
          placeholder="Cadena inicial"
          value={startingEdge}
          onChange={(e) => setStartingEdge(e.target.value.replace(/[^0-1]/g, '').trim())}
          disabled={showGraphFlag}
        />
        {showGraphFlag && (
          <div>
            <p>
              <button onClick={nextButton} disabled={stepHistory.current.length >= 2 ** currentEdge.length}>
                Paso siguiente
              </button>
              <button onClick={prevButton} disabled={stepHistory.current.length <= 1}>
                Paso Previo
              </button>
              <button onClick={borrar}>Borrar</button>
              <button onClick={togglePhysics}>{physicsInGraph.current ? 'Apagar' : 'Activar'} fisica</button>
            </p>
            <p>
              Mostrar grafo completo: {drawFullGraphFlag ? 'Sí' : 'No'}
              <br />
              Modo de grafo: {graphModeFlag}
            </p>
          </div>
        )}
        {!showGraphFlag && (
          <div>
            <button onClick={showGraph} disabled={startingEdge.length == 0}>
              Mostrar paso a paso
            </button>
            <select value={graphModeFlag} onChange={(e) => setGraphModeFlag(e.target.value)}>
              <option value="show_ccr">Dibujar solo CCR</option>
              <option value="show_empty">Empezar con grafo vacio</option>
              <option value="show_full">Dibujar grafo completo</option>
            </select>
          </div>
        )}
      </div>
      <div className="graph-history">
        {showGraphFlag && (
          <div className="extra-data">
            <p className="cadena">Secuencia de Bruijn: {stepHistory.current.map((e) => e[e.length - 1]).join('')}</p>
            <p className="cadena">Arista actual: {currentEdge.join('')}</p>
            <div>
              Ultimos 10 pasos:
              <ul>
                {stepHistory.current.slice(-10).map((step, index) => (
                  <li key={index}>{step.join('')}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function drawOnlyFirstNode(startingEdge: Arista, visgraph: React.MutableRefObject<MyNetwork | null>) {
  drawEdge(startingEdge, visgraph)
}

function drawFullGraph(startingEdge: Arista, visgraph: React.MutableRefObject<MyNetwork | null>) {
  for (let i = 0; i < Math.pow(2, startingEdge.length); i++) {
    const currentEdge = i
      .toString(2)
      .padStart(startingEdge.length, '0')
      .split('')
      .map((n) => parseInt(n) as Binario)
    drawEdge(currentEdge, visgraph)
  }
}

function drawCCRIntoGraph(startingEdge: Arista, visgraph: React.MutableRefObject<MyNetwork | null>) {
  const ccr_steps = ccr(startingEdge)
  const unique_nodes = ccr_steps
    .map((n) => n.slice(0, -1).join(''))
    .filter((value, index, self) => self.indexOf(value) === index)

  for (let i = 0; i < unique_nodes.length; i++) {
    drawNode(toArista(unique_nodes[i]), visgraph)
  }
  for (let i = 0; i < ccr_steps.length; i++) {
    drawEdge(ccr_steps[i], visgraph)
  }
}

function drawNode(currentNode: Arista, visgraph: MutableRefObject<MyNetwork | null>) {
  if (visgraph.current?.body.data.nodes.get(currentNode.join(''))) {
    return
  }

  visgraph.current?.body.data.nodes.add({
    id: currentNode.join(''),
    label: currentNode.join(''),
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    ...CONSTANTS.NODE_DEFAULT_OPTIONS,
  })
}

function drawEdge(currentEdge: Arista, visgraph: MutableRefObject<MyNetwork | null>) {
  if (visgraph.current?.body.data.edges.get(currentEdge.join(''))) {
    return
  }
  const from = currentEdge.slice(0, -1)
  const to = currentEdge.slice(1)

  drawNode(from, visgraph)
  drawNode(to, visgraph)

  const extraOptions: { smooth?: {} } = {}

  const posibleWayBack = to.concat(currentEdge[0])
  if (
    posibleWayBack.slice(1).join('') == currentEdge.slice(0, -1).join('') &&
    posibleWayBack.slice(0, -1).join('') == currentEdge.slice(1).join('')
  ) {
    extraOptions['smooth'] = {
      enabled: true,
      type: 'curvedCW',
      roundness: 0.2,
    }
  }

  visgraph.current?.body.data.edges.add({
    id: currentEdge.join(''),
    from: from.join(''),
    to: to.join(''),
    label: currentEdge.join(''),
    ...extraOptions,
    ...CONSTANTS.EDGE_DEFAUL_OPTIONS,
  })
}

function markUnvisited(currentEdge: Arista, visgraph: MutableRefObject<MyNetwork | null>) {
  visgraph.current?.body.data.edges.update({
    id: currentEdge.join(''),
    label: `${currentEdge.join('')}`,
    ...CONSTANTS.EDGE_DEFAUL_OPTIONS,
  })
  visgraph.current?.body.data.nodes.update({
    id: currentEdge.slice(0, -1).join(''),
    ...CONSTANTS.NODE_DEFAULT_OPTIONS,
  })
}

function markVisited(currentEdge: Arista, visgraph: MutableRefObject<MyNetwork | null>) {
  visgraph.current?.body.data.edges.update({
    id: currentEdge.join(''),
    label: `${currentEdge.join('')}`,
    ...CONSTANTS.EDGE_VISITED_OPTIONS,
  })
  visgraph.current?.body.data.nodes.update({
    id: currentEdge.slice(0, -1).join(''),
    ...CONSTANTS.NODE_VISITED_OPTIONS,
  })
}

function markHighlight(currentEdge: Arista, visgraph: MutableRefObject<MyNetwork | null>) {
  visgraph.current?.body.data.edges.update({
    id: currentEdge.join(''),
    label: `${currentEdge.join('')} (next)`,
    ...CONSTANTS.EDGE_ACTIVE_OPTIONS,
  })
  visgraph.current?.body.data.nodes.update({
    id: currentEdge.slice(0, -1).join(''),
    ...CONSTANTS.NODE_ACTIVE_OPTIONS,
  })
}

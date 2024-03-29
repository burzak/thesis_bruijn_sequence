import { useRef } from 'react'

import Graph from 'react-graph-vis'

import * as CONSTANTS from './constants'

import { MyNetwork, GraphControl } from './GraphControl'

const App = () => {
  const visgraph = useRef<MyNetwork | null>(null)

  const graph = {
    nodes: [],
    edges: [],
  }
  const options = {
    ...CONSTANTS.NETWORK_OPTIONS,
  }
  const events = {
    select: function (event: any) {
      var { nodes, edges } = event
      console.log('Selected nodes:', nodes)
      console.log('Selected edges:', edges)
    },
  }

  const getNetworkCreated = (network: MyNetwork) => {
    visgraph.current = network
    ;(window as any).visgraph = network
  }

  return (
    <div className="app" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Graph
        className="test"
        graph={graph}
        options={options}
        events={events}
        style={{ height: '100vh' }}
        getNetwork={getNetworkCreated}
      />
      <GraphControl visgraph={visgraph} />
    </div>
  )
}

export default App

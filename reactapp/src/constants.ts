export const NETWORK_OPTIONS = {
  edges: {
    color: '#000000',
  },
  nodes: {
    color: '#D2E5FF',
  },
  height: '100%',
  width: '100%',
  physics: {
    solver: 'repulsion',
    repulsion: {
      nodeDistance: 200, // Put more distance between the nodes.
      centralGravity: 0.1, // Pull nodes to the center.
      springLength: 150, // The spring length.
      springConstant: 0.01, // The spring constant.
      damping: 0.09, // The damping factor.
    },
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,
      fit: true,
    },
  },
  // physics: {
  //   solver: 'barnesHut',
  //   barnesHut: {
  //     gravitationalConstant: -2000,
  //     centralGravity: 0.3,
  //     springLength: 95,
  //     springConstant: 0.04,
  //     damping: 0.09,
  //     avoidOverlap: 0.1
  //   },
  //   stabilization: {
  //     enabled: true,
  //     iterations: 1000,
  //     updateInterval: 100,
  //     onlyDynamicEdges: false,
  //     fit: true
  //   },
  // },
  // physics: {barnesHut: {gravitationalConstant: 0,
  //   centralGravity: 0, springConstant: 0}}
}

/**
  physics: {
    solver: 'barnesHut',
    barnesHut: {
      gravitationalConstant: -2000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 0.1
    },
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,
      fit: true
    },
  },
 */

export const EDGE_DEFAUL_OPTIONS = {
  arrows: {
    to: {
      enabled: true,
      scaleFactor: 1,
    },
    // from: {
    //   enabled: true,
    //   scaleFactor: 1
    // },
  },
  // smooth: {
  //   enabled: false,
  //   type: 'curvedCW',
  //   roundness: 0.2
  // },
  font: { align: 'top' },
  color: '#000000',
  dashes: true,
}

export const EDGE_ACTIVE_OPTIONS = {
  color: '#FF0000',
}

export const EDGE_VISITED_OPTIONS = {
  color: '#0000FF',
  dashes: false,
}

/**
color.border	String	'#2B7CE9'	The color of the border of the node when it is not selected or hovered over (assuming hover is enabled in the interaction module).
color.background	String	'#D2E5FF'	The color of the background of the node when it is not selected or hovered over (assuming hover is enabled in the interaction module).
color.highlight	Object or String	Object	The color of the node when it is selected. Alternatively, you can just supply a string color value.
color.highlight.border	String	'#2B7CE9'	The color of the border of the node when it is selected.
color.highlight.background	String	'#D2E5FF'	The color of the background of the node when it is selected.
color.hover	Object or String	Object	The color of the node when the mouse hovers over it (assuming hover is enabled in the interaction module). Shorthand like above is also supported.
color.hover.border	String	'#2B7CE9'	The color of the border of the node when the mouse hovers over it (assuming hover is enabled in the interaction module).
color.hover.background	String	'#D2E5FF'	The color of the background of the node when the mouse hovers over it (assuming hover is enabled in the interaction module).
 */
export const NODE_DEFAULT_OPTIONS = {
  color: '#D2E5FF',
}

// dark blue
export const NODE_ACTIVE_OPTIONS = {
  color: '#2B7CE9',
}

// light red
export const NODE_VISITED_OPTIONS = {
  color: '#FF0000',
}

// var options = {
//   autoResize: true,
//   height: '100%',
//   width: '100%'
//   locale: 'en',
//   locales: locales,
//   clickToUse: false,
//   configure: {...},    // defined in the configure module.
//   edges: {...},        // defined in the edges module.
//   nodes: {...},        // defined in the nodes module.
//   groups: {...},       // defined in the groups module.
//   layout: {...},       // defined in the layout module.
//   interaction: {...},  // defined in the interaction module.
//   manipulation: {...}, // defined in the manipulation module.
//   physics: {...},      // defined in the physics module.
// }

var options = {
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 2,
    brokenImage: undefined,
    chosen: true,
    color: {
      border: '#2B7CE9',
      background: '#97C2FC',
      highlight: {
        border: '#2B7CE9',
        background: '#D2E5FF',
      },
      hover: {
        border: '#2B7CE9',
        background: '#D2E5FF',
      },
    },
    opacity: 1,
    fixed: {
      x: false,
      y: false,
    },
    font: {
      color: '#343434',
      size: 14, // px
      face: 'arial',
      background: 'none',
      strokeWidth: 0, // px
      strokeColor: '#ffffff',
      align: 'center',
      multi: false,
      vadjust: 0,
      bold: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold',
      },
      ital: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'italic',
      },
      boldital: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold italic',
      },
      mono: {
        color: '#343434',
        size: 15, // px
        face: 'courier new',
        vadjust: 2,
        mod: '',
      },
    },
    group: undefined,
    heightConstraint: false,
    hidden: false,
    icon: {
      face: 'FontAwesome',
      code: undefined,
      weight: undefined,
      size: 50, //50,
      color: '#2B7CE9',
    },
    image: undefined,
    imagePadding: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
    label: undefined,
    labelHighlightBold: true,
    level: undefined,
    mass: 1,
    physics: true,
    scaling: {
      min: 10,
      max: 30,
      label: {
        enabled: false,
        min: 14,
        max: 30,
        maxVisible: 30,
        drawThreshold: 5,
      },
      customScalingFunction: function (min: number, max: number, total: number, value: number) {
        if (max === min) {
          return 0.5
        } else {
          let scale = 1 / (max - min)
          return Math.max(0, (value - min) * scale)
        }
      },
    },
    shadow: {
      enabled: false,
      color: 'rgba(0,0,0,0.5)',
      size: 10,
      x: 5,
      y: 5,
    },
    shape: 'ellipse',
    shapeProperties: {
      borderDashes: false, // only for borders
      borderRadius: 6, // only for box shape
      interpolation: false, // only for image and circularImage shapes
      useImageSize: false, // only for image and circularImage shapes
      useBorderWithImage: false, // only for image shape
      coordinateOrigin: 'center', // only for image and circularImage shapes
    },
    size: 25,
    title: undefined,
    value: undefined,
    widthConstraint: false,
    x: undefined,
    y: undefined,
  },
  edges: {
    arrows: {
      to: {
        enabled: false,
        imageHeight: undefined,
        imageWidth: undefined,
        scaleFactor: 1,
        src: undefined,
        type: 'arrow',
      },
      middle: {
        enabled: false,
        imageHeight: 32,
        imageWidth: 32,
        scaleFactor: 1,
        src: 'https://visjs.org/images/visjs_logo.png',
        type: 'image',
      },
      from: {
        enabled: false,
        imageHeight: undefined,
        imageWidth: undefined,
        scaleFactor: 1,
        src: undefined,
        type: 'arrow',
      },
    },
    endPointOffset: {
      from: 0,
      to: 0,
    },
    arrowStrikethrough: true,
    chosen: true,
    color: {
      color: '#848484',
      highlight: '#848484',
      hover: '#848484',
      inherit: 'from',
      opacity: 1.0,
    },
    dashes: false,
    font: {
      color: '#343434',
      size: 14, // px
      face: 'arial',
      background: 'none',
      strokeWidth: 2, // px
      strokeColor: '#ffffff',
      align: 'horizontal',
      multi: false,
      vadjust: 0,
      bold: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold',
      },
      ital: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'italic',
      },
      boldital: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold italic',
      },
      mono: {
        color: '#343434',
        size: 15, // px
        face: 'courier new',
        vadjust: 2,
        mod: '',
      },
    },
    hidden: false,
    hoverWidth: 1.5,
    label: undefined,
    labelHighlightBold: true,
    length: undefined,
    physics: true,
    scaling: {
      min: 1,
      max: 15,
      label: {
        enabled: true,
        min: 14,
        max: 30,
        maxVisible: 30,
        drawThreshold: 5,
      },
      customScalingFunction: function (min: number, max: number, total: number, value: number) {
        if (max === min) {
          return 0.5
        } else {
          var scale = 1 / (max - min)
          return Math.max(0, (value - min) * scale)
        }
      },
    },
    selectionWidth: 1,
    selfReferenceSize: 20,
    selfReference: {
      size: 20,
      angle: Math.PI / 4,
      renderBehindTheNode: true,
    },
    shadow: {
      enabled: false,
      color: 'rgba(0,0,0,0.5)',
      size: 10,
      x: 5,
      y: 5,
    },
    smooth: {
      enabled: true,
      type: 'dynamic',
      roundness: 0.5,
    },
    title: undefined,
    value: undefined,
    width: 1,
    widthConstraint: false,
  },
}

// network.setOptions(options);

const ColorThief = require('./node_modules/colorthief/src/color-thief.js');
// import ColorThief from './node_modules/colorthief/dist/color-thief.umd.js'
// import { ColorThief } from './node_modules/colorthief/src/color-thief.js'


interface ImageProps {
  img: Image
  dominantColor: RGB
  palette: RGB[][]
}

interface RGB {
  R: number,
  G: number,
  B: number
}

async function validated(node: any) {
  var acceptedNodeTypes: Array<string> = [ 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'VECTOR', 'TEXT' ];
  return acceptedNodeTypes.indexOf(node.type) > -1
}

async function createPalette(node: any) {
  // Look for fills on node types that have fills.
  // An alternative would be to do `if ('fills' in node) { ... }
  if (validated(node)) {
    // Paints reference images by their hash.
    const image = figma.getImageByHash(node.type.imageHash)

    ColorThief.getColor(image)
    .then(color => { console.log(color) })
    .catch(err => { console.log(err) })

  } else {
    return new Error("node type is not valid")
  }
}

// conduct printing of dominant color
const nodes: SceneNode[] = [];
const node = figma.currentPage.selection[0]

createPalette(node)
// const rect = figma.createRectangle()
// rect.x = 150
// rect.fills = [{type: 'SOLID', color: {R: 1, G: 0.5, B: 0}}];
figma.currentPage.appendChild(node);
nodes.push(node);

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes); 

figma.closePlugin()


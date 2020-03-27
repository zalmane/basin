import { Template } from './template'
import jobContent from '../pages/demoJob'
import TopologicalSort from 'topological-sort';

const sortedGraph = new TopologicalSort<Number, Object>(new Map());
jobContent.blocks.forEach( block => {
  sortedGraph.addNode(block.id,block)
})
jobContent.links.forEach( link => {
  sortedGraph.addEdge(link.originId,link.targetId)
})
const sortedBlocks = sortedGraph.sort();
//
// load all templates
//
var requireContext = require('require-context');
const requireComponent = requireContext(
  // The relative path of the components folder
  '../../src/blocks',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /.*\.template/
)
let templates:{[type:string]:any} = {}
requireComponent.keys().forEach( (filename:string) => {
  // Get component config
  const blockType = filename.split("/")[0]
  templates[blockType] = new Template(filename)
})

//
// render the job
//
let jobCommands:Array<string> = []
interface Block {
  type:string
  properties:object
  id:number
}
sortedBlocks.forEach( block => {
  // find the inputs to this block
  const incomingLinks = jobContent.links.filter( (link) => link.targetId==(<Block>block.node)["id"])
  let inputs:{[slot:number]:string} = {}
  incomingLinks.forEach( link => {
    inputs[link.targetSlot] = `output_id${link.originId}_socket${link.originSlot}`
  })
  jobCommands.push(
    templates[(<Block>block.node)["type"]].render({
      props: (<Block>block.node)["properties"],
      inputs: inputs
    })
  )
})
console.log(jobCommands.join("\n"))
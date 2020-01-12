import React, { FC, useEffect, useRef } from "react";
import cytoscape, {
  CytoscapeOptions,
  EdgeDefinition,
  NodeDefinition,
} from "cytoscape";

import useStyles, { graphStyle } from "./styles";

const graphProperties = {
  xNodes: 7,
  xOffset: 10,
  yNodes: 7,
  yOffset: 10,
};

function generateGraph(): CytoscapeOptions["elements"] {
  const nodes: NodeDefinition[] = [];
  const edges: EdgeDefinition[] = [];

  const { xNodes, xOffset, yNodes, yOffset } = graphProperties;
  for (let row = 0; row < yNodes; row++) {
    for (let column = 0; column < xNodes; column++) {
      const node: NodeDefinition = {
        data: {
          id: `node::${row}${column}`,
        },
        position: {
          x: (row + 1) * xOffset,
          y: (column + 1) * yOffset,
        },
        group: "nodes",
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        classes: "",
      };
      nodes.push(node);

      if (row !== yNodes - 1) {
        const edgeBottom: EdgeDefinition = {
          data: {
            id: `edgeBottom::${row}${column} bottom`,
            source: `node::${row}${column}`,
            target: `node::${row + 1}${column}`,
          },
          group: "edges",
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: "",
        };
        edges.push(edgeBottom);
      }

      if (column !== xNodes - 1) {
        const edgeRight: EdgeDefinition = {
          data: {
            id: `edge::${row}${column} right`,
            source: `node::${row}${column}`,
            target: `node::${row}${column + 1}`,
          },
          group: "edges",
          selected: false,
          selectable: true,
          locked: false,
          grabbable: true,
          classes: "",
        };
        edges.push(edgeRight);
      }
    }
  }

  return nodes.concat(edges);
}

let graph: ReturnType<typeof cytoscape>;

const App: FC = () => {
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    graph = cytoscape({
      autounselectify: true,
      container: graphContainerRef.current,
      elements: generateGraph(),
      layout: {
        name: "grid",
      },
      panningEnabled: false,
      style: graphStyle,
      userZoomingEnabled: false,
    });

    // graph.getElementById("n40").animate(
    //   {
    //     position: { x: 1000, y: 1000 },
    //     style: { backgroundColor: "red" },
    //   },
    //   {
    //     duration: 10000,
    //   },
    // );
    // graph.nodes().animate(
    //   {
    //     position: { x: 100, y: 100 },
    //     style: { backgroundColor: "red" },
    //   },
    //   {
    //     duration: 1000,
    //   },
    // );

    return function destroyGraph() {
      graph.destroy();
    };
  }, [graphContainerRef]);

  return <div className={classes.graph} ref={graphContainerRef} />;
};

export default App;

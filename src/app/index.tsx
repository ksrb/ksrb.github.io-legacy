import React, { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

import graph from "./miserables.json";

import useStyles from "./styles";

interface Node {
  id: string;
  group: string;
}

interface Link {
  source: string;
  target: string;
  // TODO: unused consider removing
  value: string;
}

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

const draw = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const { width, height } = canvas;

  const simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3
        .forceLink()
        .id(function(d) {
          // @ts-ignore
          return d.id;
        })
        .distance(20),
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation.nodes(graph.nodes).on("tick", tick);

  // @ts-ignore
  simulation.force("link").links(graph.links);

  d3.select(canvas).call(
    // @ts-ignore
    d3
      .drag()
      .container(canvas)
      .subject(dragSubject)
      .on("start", handleDragStarted)
      .on("drag", handleDrag)
      .on("end", handleDragEnded),
  );

  function tick() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    graph.links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    graph.nodes.forEach(drawNode);
    context.fill();
  }

  function dragSubject() {
    return simulation.find(d3.event.x, d3.event.y);
  }

  function handleDragStarted() {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
    }
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function handleDrag() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function handleDragEnded() {
    if (!d3.event.active) {
      simulation.alphaTarget(0);
    }
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  function drawLink(d: any) {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  }

  function drawNode(d: any) {
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
  }
};

const App: FC = () => {
  const graphContainerRef = useRef<HTMLCanvasElement>(null);
  const classes = useStyles();

  useEffect(() => {
    canvas = graphContainerRef.current as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) {
      return;
    }

    draw();

    window.addEventListener("resize", draw);
  }, [graphContainerRef]);

  return <canvas className={classes.graph} ref={graphContainerRef} />;
};

export default App;

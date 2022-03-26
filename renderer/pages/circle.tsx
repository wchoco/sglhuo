import { MenuContainer } from "../components/menuContainer";
import * as d3 from "d3";
import { RefObject, useEffect, useRef } from "react";
import { ipcRenderer } from "electron";
import Audio from "../lib/audio";

const width = 400;
const height = 400;
const bin = 128;
const binWidth = 2;
const binHeight = height / 2;
const fps = 120;
const radius = 200;
const secDegree = 20;

export default function Circle() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    ipcRenderer.send("resizeWindow", [width + 30, height + 30]);
  }, []);

  useEffect(() => {
    init(svgRef);
  }, [svgRef]);

  return (
    <MenuContainer>
      <svg ref={svgRef} />
    </MenuContainer>
  );
}

const init = (svgRef: RefObject<SVGSVGElement>) => {
  const audio = new Audio(bin * 2);
  audio.unsetStream();

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const node = g
    .selectAll("rect")
    .data(audio.getData())
    .enter()
    .append("g")
    .classed("node", true)
    .attr("transform", (d, i) => {
      return `rotate(${(i / bin) * 360 - 90})translate(0,${radius})`;
    });

  node
    .append("rect")
    .attr("fill", "#fff")
    .attr("transform", "rotate(180)")
    .attr("width", binWidth);

  let rotate = 0;
  const draw = (data: Uint8Array) => {
    d3.selectAll("rect")
      .data(data)
      .transition()
      .duration(1000 / fps)
      .ease(d3.easeExpOut)
      .attr("height", (d) => (d * binHeight) / 255 + 1);

    g.attr(
      "transform",
      `translate(${width / 2},${height / 2})rotate(${rotate})`
    );
    rotate = (rotate + secDegree / fps) % 360;
  };

  audio.startStream("communications", 1000 / fps, draw);
};

import { RefObject, useEffect, useRef } from "react";
import Audio from "../lib/audio";
import * as d3 from "d3";
import { ipcRenderer } from "electron";
import { Timer } from "../lib/timer";
import { MenuContainer } from "../components/menuContainer";

const fps = 120;
const bin = 256;
const binWidth = 5;
const binPadding = 2;
const width = ((binWidth + binPadding) * bin) / 2;
const height = 255;

export default function Simple() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    ipcRenderer.send("resizeWindow", [width + 30, height + 30]);
  }, []);
  useEffect(() => {
    Timer.clear();
    init(svgRef);
  }, [svgRef]);

  return (
    <>
      <MenuContainer>
        <svg ref={svgRef} />
      </MenuContainer>
    </>
  );
}

const init = (svgRef: RefObject<SVGSVGElement>) => {
  const audio = new Audio(bin);
  audio.unsetStream();

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height);

  const rect = svg
    .selectAll("rect")
    .data(audio.getData())
    .enter()
    .append("rect");

  const draw = (data: Uint8Array) => {
    rect
      .data(data)
      .transition()
      .duration(1000 / fps)
      .ease(d3.easeExpOut)
      .attr("width", binWidth)
      .attr("height", (d) => d + 1)
      .attr("x", (_, i) => i * (binWidth + binPadding))
      .attr("y", (d) => height - d - 1)
      .attr("fill", "#fff");
  };

  audio.startStream("communications", 1000 / fps, draw);
};

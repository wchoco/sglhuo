import React, { useEffect } from "react";
import { Timer } from "../lib/timer";
import { Box, Grid, Typography } from "@mui/material";
import { ipcRenderer } from "electron";
import { VisualyzerItem } from "../components/visualyzerItem";
import { DragHandle } from "../components/dragHandle";
import { CloseButton } from "../components/closeButton";

const width = 300;
const height = 150;

function Home() {
  useEffect(() => {
    Timer.clear();
  });

  useEffect(() => {
    ipcRenderer.send("resizeWindow", [width, height]);
  }, []);

  return (
    <Box
      border="solid"
      borderRadius={2}
      p={2}
      sx={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs="auto" display="flex" alignItems="center">
            <DragHandle />
          </Grid>

          <Grid item xs display="flex" alignItems="center">
            <Typography fontSize={20}>SGLHUO</Typography>
          </Grid>

          <Grid item xs="auto">
            <CloseButton />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <VisualyzerItem name="SIMPLE" href="/simple" />
        </Grid>

        <Grid item xs={6}>
          <VisualyzerItem name="CIRCLE" href="/circle" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;

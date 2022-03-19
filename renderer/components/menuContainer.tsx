import { Box, Grid, IconButton, Popover } from "@mui/material";
import Link from "next/link";
import { ReactNode, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { DragHandle } from "./dragHandle";
import { CloseButton } from "./closeButton";

type Props = {
  children: ReactNode;
  form?: ReactNode;
};

export function MenuContainer(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl == null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box onContextMenu={handlePopoverOpen} onClick={handlePopoverOpen}>
        {props.children}
        <Popover open={open} anchorEl={anchorEl}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs="auto" display="flex" alignItems="center">
                <DragHandle />
              </Grid>

              <Grid item xs="auto">
                <Link href="/home">
                  <IconButton>
                    <HomeIcon />
                  </IconButton>
                </Link>
              </Grid>

              <Grid item xs="auto">
                <CloseButton />
              </Grid>
            </Grid>

            {props.form && (
              <Grid item xs={12}>
                {props.form}
              </Grid>
            )}
          </Grid>
        </Popover>
      </Box>
    </>
  );
}

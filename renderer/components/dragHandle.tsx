import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Icon } from "@mui/material";

export function DragHandle() {
  return (
    <>
      <Icon
        sx={{
          "-webkit-app-region": "drag",
        }}
      >
        <DragIndicatorIcon />
      </Icon>
    </>
  );
}

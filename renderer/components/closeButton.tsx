import { Icon, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ipcRenderer } from "electron";

export function CloseButton() {
  const handleClick = () => {
    ipcRenderer.send("closeWindow");
  };
  return (
    <IconButton onClick={handleClick}>
      <Icon>
        <CloseIcon />
      </Icon>
    </IconButton>
  );
}

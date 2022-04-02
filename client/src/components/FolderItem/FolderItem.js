import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";

export default function FolderItem() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    console.log("delete");
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemIcon onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText primary={<Typography noWrap>Folder 1</Typography>} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          <TodoItem />
        </List>
      </Collapse>
    </>
  );
}

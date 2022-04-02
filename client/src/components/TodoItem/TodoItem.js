import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

export default function TodoItem() {
  const [checked, setChecked] = useState(false);

  const handleCheck = async () => {
    setChecked(!checked);
  };

  const handleDelete = async () => {
    console.log("delete");
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          disableRipple
          onClick={handleCheck}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            noWrap
            sx={checked ? { textDecoration: "line-through" } : {}}
          >
            Todo item 1
          </Typography>
        }
      />
    </ListItem>
  );
}

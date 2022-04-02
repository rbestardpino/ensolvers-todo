import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { deleteFolder } from "../../lib/api";
import { useTodos } from "../../providers/TodoProvider";
import EditButton from "../EditButton/EditButton";
import TodoItem from "../TodoItem/TodoItem";

export default function FolderItem({ folder, todos }) {
  const [open, setOpen] = useState(false);
  const { setReRender, reRender } = useTodos();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    deleteFolder(folder.id).then(() => setReRender(reRender + 1));
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="Edit to-do">
              <EditButton isFolder data={folder} />
            </Tooltip>
            <Tooltip title="Delete to-do">
              <IconButton
                sx={{ ml: 1 }}
                edge="end"
                aria-label="delete"
                onClick={handleDelete}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <ListItemIcon onClick={handleClick} sx={{ cursor: "pointer" }}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography noWrap sx={{ mr: 3 }}>
              {folder.name}
            </Typography>
          }
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

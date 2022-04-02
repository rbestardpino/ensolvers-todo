import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { deleteTodo, updateTodo } from "../../lib/api";
import { useTodos } from "../../providers/TodoProvider";
import EditButton from "../EditButton/EditButton";

export default function TodoItem({ todo }) {
  const [checked, setChecked] = useState(todo.done);
  const { setReRender, reRender } = useTodos();

  const handleCheck = async () => {
    updateTodo(todo.id, {
      done: !checked,
    }).then(() => setChecked(!checked));
  };

  const handleDelete = async () => {
    deleteTodo(todo.id).then(() => setReRender(reRender + 1));
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <Tooltip title="Edit folder">
            <EditButton data={todo} />
          </Tooltip>
          <Tooltip title="Delete folder">
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
            sx={checked ? { textDecoration: "line-through", mr: 3 } : { mr: 3 }}
          >
            {todo.name}
          </Typography>
        }
      />
    </ListItem>
  );
}

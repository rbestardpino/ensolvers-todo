import List from "@mui/material/List";
import FolderItem from "../FolderItem/FolderItem";
import TodoItem from "../TodoItem/TodoItem";

export default function TodosList() {
  return (
    <List>
      <TodoItem />
      <FolderItem />
    </List>
  );
}

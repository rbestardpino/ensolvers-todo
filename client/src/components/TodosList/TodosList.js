import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useTodos } from "../../providers/TodoProvider";
import FolderItem from "../FolderItem/FolderItem";
import TodoItem from "../TodoItem/TodoItem";

export default function TodosList() {
  const { todos, folders, loading } = useTodos();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <List>
        {todos
          .filter((todo) => !todo.folderId)
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            todos={todos.filter((todo) => todo.folderId === folder.id)}
          />
        ))}
      </List>
      {!todos.length && !folders.length && (
        <Container>
          <Typography variant="body1">
            You do not have any items, add one by clicking the "ADD NEW" button.
          </Typography>
        </Container>
      )}
    </>
  );
}

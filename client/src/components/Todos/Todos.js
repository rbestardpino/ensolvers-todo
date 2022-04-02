import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddButton from "../AddButton/AddButton";
import TodosList from "../TodosList/TodosList";

export default function Todos() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4">To-Do List</Typography>
        </Grid>
        <Grid item>
          <AddButton />
        </Grid>
      </Grid>
      <TodosList />
    </>
  );
}

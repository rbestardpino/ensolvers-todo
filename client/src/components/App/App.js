import Container from "@mui/material/Container";
import Navbar from "../Navbar/Navbar";
import Todos from "../Todos/Todos";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ my: 3 }}>
        <Todos />
      </Container>
    </>
  );
}


import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import toast from "react-hot-toast";
import { createFolder, createTodo } from "../../lib/api";
import { useTodos } from "../../providers/TodoProvider";

export default function AddModal({ isFolder, open, handleClose }) {
  const { setReRender, folders, reRender } = useTodos();
  const [name, setName] = useState("");
  const [folder, setFolder] = useState("None");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeFolder = (event) => {
    setFolder(event.target.value);
  };

  const handleSubmit = async () => {
    if (isFolder) {
      await createFolder({
        name,
      });
    } else {
      await createTodo({
        name,
        folder: folder ? folder : undefined,
      });
    }
    toast.success(`${isFolder ? "Folder" : "To-Do"} created succesfully`, {
      icon: "🌟",
    });
    setReRender(reRender + 1);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create new {isFolder ? "folder" : "To-Do item"}</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          autoComplete="off"
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          variant="outlined"
          onChange={handleChangeName}
        />
        {!isFolder && (
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="folder">Folder</InputLabel>
            <Select
              labelId="folder"
              value={folder}
              label="Folder"
              onChange={handleChangeFolder}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              {folders.map((folder) => (
                <MenuItem value={folder.id}>{folder.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit();
            handleClose();
          }}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

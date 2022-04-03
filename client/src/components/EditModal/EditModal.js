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
import { updateFolder, updateTodo } from "../../lib/api";
import { useTodos } from "../../providers/TodoProvider";

export default function EditModal({ isFolder, open, handleClose, data }) {
  const { setReRender, folders, reRender } = useTodos();
  const [name, setName] = useState(data.name);
  const [folderId, setFolderId] = useState(data.folderId);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeFolder = (event) => {
    setFolderId(event.target.value);
  };

  const handleSubmit = async () => {
    if (isFolder) {
      await updateFolder(data.id, {
        name,
      });
    } else {
      await updateTodo(data.id, {
        name,
        folder: folderId ? folderId : undefined,
      });
    }
    toast.success(`${isFolder ? "Folder" : "To-Do"} updated succesfully`, {
      icon: "🌟",
    });
    setReRender(reRender + 1);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        Editing {data.name} {isFolder ? "folder" : "To-Do item"}
      </DialogTitle>
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
              value={folderId}
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
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddModal({ isFolder, open, handleClose }) {
  const [name, setName] = useState("");
  const [folder, setFolder] = useState(null);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeFolder = (_, newValue) => {
    setFolder(newValue.id);
  };

  const handleSubmit = () => {
    console.log(name, folder);
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
          <Autocomplete
            disablePortal
            sx={{ my: 1 }}
            onChange={handleChangeFolder}
            options={[{ label: "Folder 1", id: 1 }]}
            renderInput={(params) => <TextField {...params} label="Folder" />}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

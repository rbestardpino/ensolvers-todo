import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { updateFolder, updateTodo } from "../../lib/api";
import { useTodos } from "../../providers/TodoProvider";

export default function EditModal({ isFolder, open, handleClose, data }) {
  const { setReRender, folders, reRender } = useTodos();
  const [name, setName] = useState(data.name);
  const [folder, setFolder] = useState(data.folder);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeFolder = (_, newValue) => {
    setFolder(newValue.id);
  };

  const handleSubmit = async () => {
    if (isFolder) {
      await updateFolder(data.id, {
        name,
      });
    } else {
      await updateTodo(data.id, {
        name,
        folder: folder ? folder : undefined,
      });
    }
    setOpenSnackbar(true);
    setReRender(reRender + 1);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
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
            <Autocomplete
              disablePortal
              sx={{ my: 1 }}
              onChange={handleChangeFolder}
              options={folders.map((folder) => {
                return { label: folder.name, id: folder.id };
              })}
              renderInput={(params) => <TextField {...params} label="Folder" />}
            />
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleCloseSnackbar}
        >
          {name} edited succesfully
        </Alert>
      </Snackbar>
    </>
  );
}

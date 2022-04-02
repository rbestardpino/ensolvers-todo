import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import AddModal from "../AddModal/AddModal";

export default function AddButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState({ open: false, folder: false });
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenDialog = (folder) => {
    setOpenDialog({ open: true, folder });
  };
  const handleCloseDialog = () => {
    setOpenDialog({ open: false, folder: false });
  };

  return (
    <>
      <Button
        onClick={handleOpenMenu}
        variant="outlined"
        endIcon={<AddOutlinedIcon />}
      >
        Add new
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenDialog(false);
          }}
        >
          <CreateOutlinedIcon sx={{ pr: 1 }} fontSize="large" />
          To-Do item
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDialog(true);
          }}
        >
          <CreateNewFolderOutlinedIcon sx={{ pr: 1 }} fontSize="large" />
          Folder
        </MenuItem>
        <AddModal
          open={openDialog.open}
          isFolder={openDialog.folder}
          handleClose={handleCloseDialog}
        />
      </Menu>
    </>
  );
}

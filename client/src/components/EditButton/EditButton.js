import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import EditModal from "../EditModal/EditModal";

export default function EditButton({ isFolder, data }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton edge="end" aria-label="edit" onClick={handleOpenDialog}>
        <EditOutlinedIcon />
      </IconButton>
      <EditModal
        open={openDialog}
        isFolder={isFolder}
        data={data}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

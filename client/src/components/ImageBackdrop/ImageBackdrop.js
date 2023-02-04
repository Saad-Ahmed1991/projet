import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteImage } from "../../redux/Actions/serviceActions";

export default function ImageBackdrop({ selectedImage, setSelectedImage }) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="backdrop">
          <button
            onClick={() => {
              dispatch(deleteImage(selectedImage));
            }}
            className="picture_delete_btn"
          >
            Delete this picture <DeleteIcon />
          </button>
          <img src={selectedImage} alt="" />
        </div>
      </Backdrop>
    </div>
  );
}

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage } from "../../redux/Actions/serviceActions";
import { useParams } from "react-router-dom";

export default function ImageBackdrop({ selectedImage, setSelectedImage }) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const obj = useParams();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const service = useSelector(
    (state) => state.serviceReducer.allServices
  ).filter((el) => el._id == obj.id);

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
          {currentUser && currentUser._id == service[0].user._id ? (
            <button
              onClick={() => {
                dispatch(deleteImage(selectedImage));
              }}
              className="picture_delete_btn"
            >
              Delete this picture <DeleteIcon />
            </button>
          ) : null}
          <img src={selectedImage} alt="" />
        </div>
      </Backdrop>
    </div>
  );
}

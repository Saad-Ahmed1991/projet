import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

export default function UserImageBackdrop({ selectedImage, setSelectedImage }) {
  const [open, setOpen] = React.useState(true);

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
          <img src={selectedImage} alt="" />
        </div>
      </Backdrop>
    </div>
  );
}

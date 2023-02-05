import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageList } from "@mui/material";
import { useSelector } from "react-redux";
import ImageBackdrop from "../ImageBackdrop/ImageBackdrop";

const UserImagesList = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="gallery">
      {images.length === 0 ? (
        <div className="empty_gallery">
          <h3>This profile has no images yet</h3>
        </div>
      ) : (
        <div className="image_list">
          <ImageList sx={{ width: 1, height: 600 }} cols={3} rowHeight={300}>
            {images.reverse().map((item) => (
              <ImageListItem key={item}>
                <img
                  className="image_list_item"
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item}
                  loading="lazy"
                  onClick={() => {
                    setSelectedImage(item);
                  }}
                />
              </ImageListItem>
            ))}
            {selectedImage && (
              <ImageBackdrop
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )}
          </ImageList>
        </div>
      )}
    </div>
  );
};

export default UserImagesList;

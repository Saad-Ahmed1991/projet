import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageList } from "@mui/material";
import { useSelector } from "react-redux";
import ImageBackdrop from "../ImageBackdrop/ImageBackdrop";

const ImagesList = () => {
  const itemData = useSelector(
    (state) => state.serviceReducer.currentService.images
  );
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="gallery">
      {itemData.length === 0 ? (
        <div className="empty_gallery">
          <h3>
            Your gallery is empty, upload your work pictures to display them
            here!
          </h3>
        </div>
      ) : (
        <div className="image_list">
          <ImageList sx={{ width: 1, height: 600 }} cols={3} rowHeight={300}>
            {itemData.reverse().map((item) => (
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

export default ImagesList;

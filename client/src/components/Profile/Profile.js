import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import avatar from "../../avatar.jpg";
import UploadIcon from "@mui/icons-material/Upload";
import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../redux/Actions/profileActions";
import ImagesList from "../ImageList/ImageList";
import {
  Button,
  CircularProgress,
  NativeSelect,
  Rating,
  TextField,
} from "@mui/material";
import {
  getCUrrentService,
  updateProfession,
  uploadImages,
} from "../../redux/Actions/serviceActions";
import { professions } from "../Consts/consts";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [images, setImages] = useState([]);

  const currentProfile = useSelector(
    (state) => state.profileReducer.currentProfile
  );
  const currentService = useSelector(
    (state) => state.serviceReducer.currentService
  );
  const [previewSource, setPreviewSource] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleProfileImageChange = (e) => {
    if (!previewSource) return;
    uploadImage(previewSource);
    setPreviewSource("");
  };
  //////////////////////////////
  const uploadImage = async (base64image) => {
    dispatch(uploadProfilePicture({ profileImg: base64image }));
  };
  const dispatch = useDispatch();
  //const idProfile = useParams();
  const [newProfile, setNewProfile] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const token = localStorage.getItem("token");
  const loading = useSelector((state) => state.profileReducer.loading);
  const serviceLoading = useSelector((state) => state.serviceReducer.loading);

  //upload multiple

  const handleImagesUpload = async (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadImages = () => {
    dispatch(uploadImages(images), setImages([]));
  };
  const handleUpdateService = (e) => {
    dispatch(
      updateProfession({
        profession: e.target.value,
      })
    );
    setEdit(false);
  };
  useEffect(() => {
    dispatch(getProfile(token));
    dispatch(getCUrrentService(token));
  }, []);

  return (
    <>
      {loading || serviceLoading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <section className="section about-section gray-bg" id="about">
            <div className="btn_edit">
              {edit ? (
                <>
                  <button
                    className="btn-4 btn_save_cancel"
                    onClick={() => {
                      dispatch(
                        updateProfile(
                          [newProfile, updatedUser],
                          currentProfile._id,
                          setEdit
                        )
                      );
                    }}
                  >
                    save
                  </button>
                  <button
                    style={{ marginLeft: "1.2rem" }}
                    className="btn-4 btn_save_cancel"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn-4"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  Update your profile
                </button>
              )}
            </div>
            <div className="container">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-lg-6">
                  <div className="about-text go-to">
                    <h3 className="dark-color">
                      {currentProfile.user && currentProfile.user.firstName}{" "}
                      {currentProfile.user && currentProfile.user.lastName}
                    </h3>
                    <div className="row about-list">
                      <div className="col-md-6">
                        <div className="media">
                          <label>Birthday</label>
                          {edit ? (
                            <TextField
                              id="standard-basic"
                              label="Birthday"
                              variant="standard"
                              onChange={(e) => {
                                setNewProfile({
                                  ...newProfile,
                                  birthday: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p>{currentProfile.birthday}</p>
                          )}
                        </div>
                        <div className="media">
                          <label>City</label>
                          {edit ? (
                            <TextField
                              id="standard-basic"
                              label="City"
                              variant="standard"
                              onChange={(e) => {
                                setNewProfile({
                                  ...newProfile,
                                  city: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p>{currentProfile.city}</p>
                          )}
                        </div>
                        {currentProfile.user &&
                        currentProfile.user.role === "worker" ? (
                          <div className="media">
                            <label>Profession</label>
                            {edit ? (
                              <NativeSelect
                                onChange={handleUpdateService}
                                inputProps={{
                                  name: "profession",
                                  id: "uncontrolled-native",
                                }}
                              >
                                {professions.map((profession) => (
                                  <option value={profession}>
                                    {profession}
                                  </option>
                                ))}
                              </NativeSelect>
                            ) : (
                              <p>{currentService.profession}</p>
                            )}
                          </div>
                        ) : null}
                        {currentProfile.user &&
                        currentProfile.user.role === "worker" ? (
                          <div
                            className="media"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <label>Rating</label>
                            <Rating
                              name="read-only"
                              precision={0.5}
                              value={
                                currentService.totalRating /
                                currentService.ratingNumber
                              }
                              readOnly
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <div className="media">
                          <label>E-mail</label>
                          <p>
                            {currentProfile.user && currentProfile.user.email}
                          </p>
                        </div>
                        <div className="media">
                          <label>Phone</label>
                          {edit ? (
                            <TextField
                              id="standard-basic"
                              label="Phone"
                              variant="standard"
                              onChange={(e) => {
                                setNewProfile({
                                  ...newProfile,
                                  phoneNumber: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p>{currentProfile.phoneNumber}</p>
                          )}
                        </div>
                        <div className="media">
                          <label>Address</label>
                          {edit ? (
                            <TextField
                              id="standard-basic"
                              label="Adress"
                              variant="standard"
                              onChange={(e) => {
                                setNewProfile({
                                  ...newProfile,
                                  adress: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p>{currentProfile.adress}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about-avatar">
                    <img
                      className="profile_img"
                      src={previewSource || currentProfile.profileImg || avatar}
                      title=""
                      alt=""
                    />
                    {!previewSource ? (
                      <>
                        <label htmlFor="file" className="label-file">
                          Change your profile picture
                        </label>
                        <input
                          onChange={handleFileInputChange}
                          id="file"
                          className="input-file"
                          type="file"
                          multiple
                        ></input>
                      </>
                    ) : (
                      <Button
                        onClick={handleProfileImageChange}
                        variant="contained"
                        style={{ width: "10rem" }}
                        endIcon={<UploadIcon />}
                      >
                        Upload now!
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="counter">
                <div className="row">
                  <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2" data-to={500} data-speed={500}>
                        500
                      </h6>
                      <p className="m-0px font-w-600">Following</p>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2" data-to={150} data-speed={150}>
                        150
                      </h6>
                      <p className="m-0px font-w-600">Last Time Connected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {currentProfile.user && currentProfile.user.role === "worker" ? (
            <div className="image_list section about-section gray-bg">
              <div
                style={{
                  margin: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {images.length === 0 ? (
                  <>
                    <label className="label-file" htmlFor="multiple_select">
                      Click here to upload pictures to your gallery
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      multiple
                      id="multiple_select"
                      onChange={handleImagesUpload}
                    />
                  </>
                ) : (
                  <label className="label-file" onClick={handleUploadImages}>
                    Upload now!
                  </label>
                )}
              </div>
              <ImagesList />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Profile;

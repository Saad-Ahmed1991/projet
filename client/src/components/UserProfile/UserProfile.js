import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../avatar.jpg";
import { getALLServices } from "../../redux/Actions/serviceActions";

import "../Profile/style.css";
import UserImagesList from "../UserImageList/UserImageList";

const UserProfile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const loading = useSelector((state) => state.serviceReducer.loading);
  const service = useSelector((state) => state.serviceReducer.userService);
  useEffect(() => {
    dispatch(getALLServices("", "", 0));
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <section className="section about-section gray-bg" id="about">
            <div className="container">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-lg-6">
                  <div className="about-text go-to">
                    <h3 className="dark-color">
                      {service.user.firstName} {service.user.lastName}
                    </h3>
                    <div className="row about-list">
                      <div className="col-md-6">
                        <div className="media">
                          <label>Birthday</label>
                          <p>{service.profile.birthday}</p>
                        </div>
                        <div className="media">
                          <label>Profession</label>
                          <p>{service.profession}</p>
                        </div>
                        <div className="media">
                          <label>City</label>
                          <p>{service.profile.city}</p>
                        </div>
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
                            value={service.ratingNumber}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="media">
                          <label>E-mail</label>
                          <p>{service.user.email}</p>
                        </div>
                        <div className="media">
                          <label>Phone</label>
                          {token ? (
                            <p>{service.profile.phoneNumber}</p>
                          ) : (
                            <>
                              <p className="phoneNumber">
                                *Sign in to see contact number*
                              </p>
                            </>
                          )}
                        </div>
                        <div className="media">
                          <label>Address</label>
                          <p>{service.profile.adress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about-avatar">
                    <img
                      className="profile_img"
                      src={service.profile.profileImg || avatar}
                      title=""
                      alt=""
                    />
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
          <div className="image_list section about-section gray-bg">
            <UserImagesList images={service.images} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;

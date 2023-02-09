import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  createProfile,
  createWorkerProfile,
} from "../../redux/Actions/profileActions";
import { cities } from "../Consts/consts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/Actions/userActions";
const CreateProfile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [profession, setProfession] = useState("");
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  const handleCreateProfile = () => {
    if (currentUser.role === "worker") {
      dispatch(createWorkerProfile(profile, profession, navigate));
    } else {
      dispatch(createProfile(profile, navigate));
    }
  };

  return (
    <>
      <div>
        <section className="section about-section gray-bg" id="about">
          <div className="btn_edit">
            <button onClick={handleCreateProfile} className="btn-4">
              save your profile
            </button>
          </div>
          <div>
            <div className="row align-items-center flex-row-reverse">
              <div className="col-lg-6">
                <div className="about-text go-to">
                  <h3 className="dark-color">Create your profile</h3>
                  <div className="row about-list">
                    <div className="col-md-6">
                      <div className="media">
                        <label>Birthday</label>

                        <TextField
                          id="standard-basic"
                          label="Birthday"
                          variant="standard"
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              birthday: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="media">
                        <label>City</label>
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            City
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="City"
                            onChange={(e) => {
                              setProfile({
                                ...profile,
                                city: e.target.value,
                              });
                            }}
                          >
                            <MenuItem>
                              <em>None</em>
                            </MenuItem>
                            {cities.map((city) => (
                              <MenuItem value={city.toLowerCase()}>
                                {city}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/*<TextField
                          id="standard-basic"
                          label="City"
                          variant="standard"
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              city: e.target.value,
                            });
                          }}
                        />*/}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="media">
                        <label>Phone</label>
                        <TextField
                          id="standard-basic"
                          label="Phone"
                          variant="standard"
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              phoneNumber: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="media">
                        <label>Address</label>
                        <TextField
                          id="standard-basic"
                          label="Adress"
                          variant="standard"
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              adress: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {currentUser.role === "worker" ? (
                        <div className="media">
                          <label>Profession</label>
                          <TextField
                            id="standard-basic"
                            label="Profession"
                            variant="standard"
                            onChange={(e) => {
                              setProfession(e.target.value);
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateProfile;

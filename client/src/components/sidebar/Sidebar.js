import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import logo from "../../logo.png";
import { cities, professions } from "../Consts/consts";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { getALLServices } from "../../redux/Actions/serviceActions";
import home_logo_black from "../../assets/home_logo_black.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const handleReset = () => {
    dispatch(getALLServices("", "", 0));
    setCategory("");
    setCity("");
  };

  return (
    <>
      <div className="sidebar">
        <div className="fixed_sidebar">
          <img className="sidebar_logo" src={home_logo_black} alt="logo" />
          <FormGroup>
            <div className="sidebar_items">
              <FormLabel style={{ color: "black", fontWeight: "bold" }}>
                Filter by
              </FormLabel>
              <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    {professions.map((profession) => (
                      <MenuItem key={profession} value={profession}>
                        {profession}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {category ? (
                <div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="City"
                      defaultValue={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      {cities.map((city) => (
                        <MenuItem key={city} value={city.toLowerCase()}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : null}
              <div>
                <Button
                  style={{ width: "12rem", marginTop: "2rem" }}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={() => {
                    dispatch(getALLServices(category, city, rating));
                  }}
                >
                  Search
                </Button>
                <Button
                  style={{
                    width: "12rem",
                    marginTop: "2rem",
                    backgroundColor: "limegreen",
                  }}
                  variant="contained"
                  endIcon={<RestartAltIcon />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

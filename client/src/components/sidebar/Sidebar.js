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
        <img className="sidebar_logo" src={logo} alt="logo" />
        <FormGroup>
          <div className="sidebar_items">
            <FormLabel> Filter by</FormLabel>
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
                    <MenuItem value={profession}>{profession}</MenuItem>
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
            {category ? (
              <div>
                <InputLabel
                  style={{ marginBottom: "1rem" }}
                  id="demo-simple-select-standard-label"
                >
                  Rating
                </InputLabel>
                <Rating
                  size="large"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
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
    </>
  );
};

export default Sidebar;

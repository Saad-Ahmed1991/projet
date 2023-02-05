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
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { getALLServices } from "../../redux/Actions/serviceActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <div className="sidebar">
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={"plombier"}>Plombier</MenuItem>
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
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"gafsa"}>Gafsa</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : null}
            {city ? (
              <div>
                <InputLabel id="demo-simple-select-standard-label">
                  Rating
                </InputLabel>
                <Rating
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
              </div>
            ) : null}
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
          </div>
        </FormGroup>
      </div>
    </>
  );
};

export default Sidebar;

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import "./style.css";

const Sidebar = () => {
  const [rating, setRating] = useState(false);
  const [category, setCategory] = useState(false);
  const [city, setCity] = useState(false);
  const [name, setName] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [categoryValue, setCategoryValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  return (
    <>
      <div className="sidebar">
        <FormGroup>
          <FormLabel> Filter by</FormLabel>
          <FormControlLabel
            control={<Checkbox />}
            label="Rating"
            onChange={() => setRating(!rating)}
          />
          <div>
            {rating ? (
              <Rating onChange={(e) => setRatingValue(e.target.value)} />
            ) : null}
          </div>
          <FormControlLabel
            control={<Checkbox />}
            label="Category"
            onChange={() => setCategory(!category)}
          />
          <div>
            {category ? (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                  onChange={(e) => setCategoryValue(e.target.value)}
                >
                  <MenuItem>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            ) : null}
          </div>
          <FormControlLabel
            control={<Checkbox />}
            label="City"
            onChange={() => setCity(!city)}
          />
          <div>
            {city ? (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                  onChange={(e) => setCityValue(e.target.value)}
                >
                  <MenuItem>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            ) : null}
          </div>
          <FormControlLabel
            control={<Checkbox />}
            label="Name"
            onChange={() => setName(!name)}
          />
          <div>
            {name ? (
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                onChange={(e) => setNameValue(e.target.value)}
              />
            ) : null}
          </div>
          <Button
            style={{ width: "12rem", marginTop: "2rem" }}
            variant="contained"
            endIcon={<SearchIcon />}
          >
            Search
          </Button>
        </FormGroup>
      </div>
    </>
  );
};

export default Sidebar;

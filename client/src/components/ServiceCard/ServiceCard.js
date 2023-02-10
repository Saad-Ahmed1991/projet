import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { FormLabel, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserService } from "../../redux/Actions/serviceActions";

export default function ServiceCard({ service }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (userId) => {
    dispatch(getUserService(`${userId}`));
    navigate(`/userprofile/${service._id}`);
  };
  return (
    <Card
      onClick={() => handleClick(service.user._id)}
      sx={{ width: 280, backgroundColor: "lightgrey", cursor: "pointer" }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={service.profile.profileImg}
            sx={{ bgcolor: red[500] }}
            aria-label="Profile image"
          ></Avatar>
        }
        title={
          service.user
            ? `${service.user.firstName} ${service.user.lastName}`
            : null
        }
        subheader={service.profession}
      />
      <CardMedia
        component="img"
        height="194"
        image={service.images[0]}
        alt=""
      />
      <CardActions disableSpacing>
        <IconButton aria-label="Rating">
          <Rating
            name="read-only"
            precision={0.5}
            value={service.totalRating / service.ratingNumber}
            readOnly
          />
        </IconButton>
        <FormLabel
          style={{ fontWeight: "bold", marginLeft: "4rem" }}
          aria-label="city"
        >
          {service.profile.city.charAt(0).toUpperCase() +
            service.profile.city.slice(1)}
        </FormLabel>
      </CardActions>
    </Card>
  );
}

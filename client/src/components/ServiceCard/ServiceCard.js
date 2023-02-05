import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/userprofile/${service._id}`}>
      <Card sx={{ width: 280 }}>
        <CardHeader
          avatar={
            <Avatar
              src={service.profile.profileImg}
              sx={{ bgcolor: red[500] }}
              aria-label="Profile image"
            ></Avatar>
          }
          title={`${service.user.firstName} ${service.user.lastName}`}
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
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>{" "}
    </Link>
  );
}

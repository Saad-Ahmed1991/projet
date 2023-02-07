import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { FormLabel, Rating } from "@mui/material";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/userprofile/${service._id}`}>
      <Card sx={{ width: 280, backgroundColor: "lightgrey" }}>
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
          <FormLabel aria-label="city">
            {service.profile.city.charAt(0).toUpperCase() +
              service.profile.city.slice(1)}
          </FormLabel>
        </CardActions>
      </Card>
    </Link>
  );
}

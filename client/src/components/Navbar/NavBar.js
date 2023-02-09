import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link as LinkR } from "react-router-dom";
import { getCurrentUser, logOut } from "../../redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const currentProfile = useSelector(
    (state) => state.profileReducer.currentProfile
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {token ? (
        <LinkR
          to={`/profile`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </LinkR>
      ) : null}
      {currentUser.role === "admin" || currentUser.role === "superAdmin" ? (
        <LinkR
          to="/userslist"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleMenuClose}>Users list</MenuItem>
        </LinkR>
      ) : null}
      {!token ? (
        <LinkR
          to="/signup"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleMenuClose}>Sign up</MenuItem>
        </LinkR>
      ) : null}
      <LinkR to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        {localStorage.getItem("token") ? (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              dispatch(logOut());
            }}
          >
            LogOut
          </MenuItem>
        ) : (
          <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
        )}
      </LinkR>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  React.useEffect(() => {
    dispatch(getCurrentUser(token));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LinkR to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon style={{ color: "white" }} />
            </IconButton>
          </LinkR>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {token ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ margin: "0" }}>
                  {currentUser.firstName} {currentUser.lastName}{" "}
                  {`(${currentUser.role} account)`}
                </p>
              </div>
            ) : null}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/*    <AccountCircle /> */}
              <Avatar
                alt="Remy Sharp"
                src={currentProfile.profileImg}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

import React from "react";
import "./style.css";

const Layout = (props) => {
  return (
    <div className="layout">
      <div className="leftside">{props.children[0]}</div>
      <div className="main">{props.children[1]}</div>
    </div>
  );
};

export default Layout;

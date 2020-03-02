import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  DASHBOARD,
  STUDENT,
  CREATE_STUDENT,
  STAFF,
  CREATE_STAFF,
  PROFILE,
  EDIT_PROFILE,
} from "../constants/routes";
import astorgaLogo from "../assets/images/astorga_logo.png";

function index(props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <div className="brand">
          <a href="" className="brand-name">
            <img
              src={astorgaLogo}
              alt="logo"
              className="logo"
              style={{ width: "80px" }}
            />
          </a>
        </div>

        <ul className="nav">
          <li>
            <b>Organization:</b> 
            <button className="btn btn-success btn-fill btn-wd">Holberton School</button>
          </li>
          <li>
            <Link to={DASHBOARD}>Dashboard</Link>
          </li>
          <li>
            <Link to={STUDENT}>Students</Link>
          </li>
          <li>
            <Link to={CREATE_STUDENT}>New Student</Link>
          </li>
          <li>
            <Link to={STAFF}>Staff</Link>
          </li>
          <li>
            <Link to={CREATE_STAFF}>Create Staff</Link>
          </li>
          {/* <li>
            <Link to={PROFILE}>My Profile</Link>
          </li>
          <li>
            <Link to={EDIT_PROFILE}>Edit Profile</Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
}

index.propTypes = {};

index.defaultProps = {};

export default withRouter(index);

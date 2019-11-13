import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Sidebar from "./Sidebar";
export class Header extends Component {
  state = {
    open: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

<<<<<<< HEAD
    render() {

        const { isAuthenticated, user } = this.props.auth;
        var userRole = "";
        var adminManager = null;
    if(user != null) {
        if(user.is_anonymous_active) {
           user.username = "Anonymous";
        }
        else if(user.is_administrator) {
            adminManager = (
                 <li className="nav-item">
                    <Link to="/manage" className="nav-link">Manage</Link>
                 </li>
            );
            userRole = (
                <strong>(Administrator)</strong>
            );
        }
        else if(user.is_moderator) {
            userRole = (
                <strong>(Moderator)</strong>
            );
        }
=======
  render() {
    let sidebarOpen = true;
    const { isAuthenticated, user } = this.props.auth;
    var userRole = "";
    var adminManager = null;
    if (user != null) {
      if (user.is_anonymous_active) {
        user.username = "Anonymous";
      } else if (user.is_administrator) {
        adminManager = (
          <li className="nav-item">
            <Link to="/manage" className="nav-link">
              Manage
            </Link>
          </li>
        );
        userRole = <strong>(Administrator)</strong>;
      } else if (user.is_moderator) {
        userRole = <strong>(Moderator)</strong>;
      }
>>>>>>> sidebar-part2
    }

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
<<<<<<< HEAD
          <strong>{user ? `Welcome ${user.username}` : ""} {userRole} </strong>

=======
          <strong>
            {user ? `Welcome ${user.username}` : ""} {userRole}{" "}
          </strong>
>>>>>>> sidebar-part2
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          GlobalTraqs
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

<<<<<<< HEAD
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">GlobalTraqs</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <Link to="/faq" className="nav-link">Faq </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/About" className="nav-link">About </Link>
                        </li>
                        {adminManager ? adminManager : ""}
                    </ul>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }
=======
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link">
                Faq{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-link">
                About{" "}
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => props.handleName(sidebarOpen)}
              ></a>
              <Sidebar yeet={sidebarOpen} />
            </li>
            {adminManager ? adminManager : ""}
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
>>>>>>> sidebar-part2
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);

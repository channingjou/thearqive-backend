import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
import axios from 'axios';
import { logout} from "../../actions/auth";
import { login } from "../../actions/auth";
import {editUser} from "../../actions/users";

export class Settings extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
  };
   constructor(props) {
    super(props);
    this.state = {
        accountDeleted: false,
        bio: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangePrivate = this.handleChangePrivate.bind(this);

  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });


  handleChange(checked) {
    this.setState({ checked });
  }
  handleChangePrivate(checked) {
    this.setState({ checked });
  }
  updateAccessibility = () => {
    const userId = this.props.auth.user.id;
    const accessibility_mode_active = this.props.auth.user.accessibility_mode_active ? false : true;
    const userData = { accessibility_mode_active };
    this.props.editUser(userId, userData);
  };
  updateProfileMode = () => {
    const userId = this.props.auth.user.id;
    const is_profile_private = this.props.auth.user.is_profile_private ? false : true;
    const userData = { is_profile_private };
    this.props.editUser(userId, userData);
  };

   deleteAccount = id => {
    this.props.logout();
    axios.delete(`api/auth/users/${id}/`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
    });
    this.setState({accountDeleted: true});
 };

   onSubmit = (e) => {
       e.preventDefault(); //prevents refresh of page

       const userId = this.props.auth.user.id;
       const bio = this.state.bio;
       const userData = { bio };
       this.props.editUser(userId, userData);
   };

   componentDidMount() {
       const { isAuthenticated, user } = this.props.auth;
       if(user) {
           console.log("setting bio");
           this.setState({bio : user.bio})
       }
   }

    render() {
      console.log("params are " + this.props.match.params.id);

      console.log("checked " + this.state.checked);
      if(this.state.accountDeleted) {
          return <Redirect to='/' />
      }
       console.log(this.props.auth);


    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";

    let userCanEdit = "";

    if(this.props.match.params.id == userid) {
        userCanEdit = (
             <div style={{ padding: "20px" }}>
                <div>

                  <br/>

                    <span>Accessibility</span>
                    <Switch className="react-switch" onChange={this.updateAccessibility} checked={user ? user.accessibility_mode_active : false} />

                </div>

                <br/>
                <div>

                  <br/>

                    <span>Make Account Public/Private</span>
                    <Switch className="react-switch" onChange={this.updateProfileMode} checked={user ? user.is_profile_private : false} />

                </div>

                <br/>

                <button  onClick={() => this.deleteAccount(userid)} type="button" className="btn btn-warning">Delete Account</button>
                {/*<Redirect to="/" />*/}

                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  <br />
                    <label>Bio</label>
                    <input
                      className="form-control"
                      type="text"
                      name="bio"
                      onChange={this.onChange}
                      value={this.state.bio}
                    />
                  </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>

            </div>
        )
    }

    const guestLinks = <div><Redirect to="/" /></div>;

    return (
      userCanEdit
    );
  }
}

Settings.propTypes = {
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
    { logout, login, editUser}
)(Settings);
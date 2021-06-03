import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

export class User extends Component {
  // Executes if component was mounted
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    // Some information about the user
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    } = this.props.user;
    const { repos } = this.props;

    const { loading } = this.props;
    if (loading) return <Spinner></Spinner>;

    return (
      <>
        <Link to="/" className="btn btn-light">
          Back to search
        </Link>
        {hireable ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-Center">
            <img
              src={avatar_url}
              className="round-img"
              alt={name}
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location ? location : "N/A"}</p>
          </div>
          <div>
            {bio && (
              <>
                <h1>Bio</h1>
                <p>{bio}</p>
              </>
            )}
            <a className="btn btn-dark my-1" href={html_url}>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <>
                    <strong>username: </strong>
                    {login}
                  </>
                )}
              </li>
              <li>
                {company && (
                  <>
                    <strong>Company: </strong>
                    {company}
                  </>
                )}
              </li>
              <li>
                {blog && (
                  <>
                    <strong>blog: </strong>
                    {blog}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos}></Repos>
      </>
    );
  }
}

export default User;

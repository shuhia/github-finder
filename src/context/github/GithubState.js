import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.githubClientId;
  githubClientSecret = process.env.githubClientSecret;
}

// Global state
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  // Fishes up github user from search and sends the user github api

  const searchUsers = async (text) => {
    if (text) {
      setLoading();
      const res =
        await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${githubClientId}&
    client_secret=${githubClientSecret}`);

      dispatch({ type: SEARCH_USERS, payload: res.data.items });
    }
  };
  // Get Users
  // Get Repos
  // Get user repos
  const getUserRepos = async (username) => {
    setLoading();

    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear Users
  // Gets a single github user
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({ type: GET_USER, payload: res.data });
  };
  // Clears users from state and loading to false
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    // Returns the variables that will be available for the entire app
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        setLoading,
        getUserRepos,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

import React from "react";
import RepoItem from "./ReposItem";
import PropTypes from "prop-types";

const Repos = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id}></RepoItem>);
};

Repos.prototype = {
  repos: PropTypes.array.isReqired,
};

export default Repos;

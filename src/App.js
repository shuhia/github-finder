import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  // Fishes up github user from search and sends the user github api
  searchUsers = async (text) => {
    if (text) {
      const res =
        await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({ users: res.data.items, loading: false });
    }
  };
  // Clears users from state and loading to false
  clearUsers = () => this.setState({ users: [], loading: false });

  // Gets a single github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    // Displays alert for 5000ms
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <div className="container">
            <Alert alert={this.state.alert}></Alert>

            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0}
                      setAlert={this.setAlert}
                    ></Search>
                    <Users loading={loading} users={users}></Users>
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About}></Route>
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  ></User>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
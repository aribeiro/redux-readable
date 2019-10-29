import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Post from "./Post";
import Posts from "./Posts";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import Header from "./Header";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <Router>
        {this.props.loading ? null : (
          <div className="App">
            <div className="content">
              <Header />
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/posts/new" component={PostForm} />
                <Route exact path="/posts/:id/edit" component={PostForm} />
                <Route
                  exact
                  path="/posts/:id/comments/new"
                  component={CommentForm}
                />
                <Route
                  exact
                  path="/comments/:id/edit"
                  component={CommentForm}
                />
                <Route exact path="/by/:sortCode" component={Posts} />
                <Route exact path="/:category" component={Posts} />
                <Route exact path="/:category/by/:sortCode" component={Posts} />
                <Route exact path="/:category/:id" component={Post} />
              </Switch>
            </div>
          </div>
        )}
      </Router>
    );
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData() {
      dispatch(handleInitialData());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

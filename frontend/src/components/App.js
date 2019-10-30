import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";

const Post = React.lazy(() => import("./Post"));
const Posts = React.lazy(() => import("./Posts"));
const PostForm = React.lazy(() => import("./PostForm"));
const CommentForm = React.lazy(() => import("./CommentForm"));
const Header = React.lazy(() => import("./Header"));

function App({ loading, handleInitialData }) {
  React.useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);

  return (
    <>
      <Router>
        {!loading && (
          <div className="App">
            <div className="content">
              <React.Suspense fallback="Loading...">
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
                  <Route
                    exact
                    path="/:category/by/:sortCode"
                    component={Posts}
                  />
                  <Route exact path="/:category/:id" component={Post} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        )}
      </Router>
    </>
  );
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

import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import sortBy from "sort-by";
import { sortParam } from "../lib/utils";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import PostPreview from "./PostPreview";

function Posts({ posts, sortCode, history, pathname }) {
  const filterPosts = event => {
    const path = `${pathname.replace(/\/by.*$/, "/")}/by/${
      event.target.value
    }`.replace(/\/\//, "/");
    history.push(path);
  };

  return (
    <>
      <main role="main" className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-md-8 blog-main">
            {posts.length === 0 && <h2>Posts not found!</h2>}
            {posts.map(post => {
              return <PostPreview key={post.id} postId={post.id} />;
            })}
          </div>

          <aside className="col-md-4 blog-sidebar text-right">
            <Button size="lg" tag={Link} color="primary" to="/posts/new">
              Add New Post
            </Button>
            <Form style={{ paddingTop: "30px" }}>
              <FormGroup>
                <Label for="orderBy">Order by</Label>
                <Input
                  type="select"
                  name="select"
                  id="orderBy"
                  value={sortCode}
                  onChange={event => filterPosts(event)}
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title [a-z]</option>
                  <option value="titleDesc">Title [z-a]</option>
                  <option value="author">Author [a-z]</option>
                  <option value="authorDesc">Author [z-a]</option>
                  <option value="mostVoted">Most Voted</option>
                  <option value="lessVoted">Less Voted</option>
                </Input>
              </FormGroup>
            </Form>
          </aside>
        </div>
      </main>
    </>
  );
}

function mapStateToProps(state, { match, location, history }) {
  const { category, sortCode } = match.params;
  const { pathname } = location;
  return {
    posts: Object.values(state.posts)
      .filter(post =>
        category ? post.category === category && !post.deleted : !post.deleted
      )
      .sort(sortBy(sortParam(sortCode))),
    categories: Object.values(state.categories),
    sortCode,
    history,
    pathname
  };
}
export default withRouter(connect(mapStateToProps)(Posts));

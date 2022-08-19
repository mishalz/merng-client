import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, TransitionGroup } from "semantic-ui-react";

import Post from "../components/Posts/Post";
import classes from "./Home.module.css";
import { AuthContext } from "../context/Auth";
import PostForm from "../components/Posts/PostForm";
import { FETCH_POSTS } from "../queries/fetch-posts";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row className={classes["home_title"]}>
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading && <p>loading ...</p>}
        {!loading && error && <p>error..</p>}
        {!loading && !error && data.getPosts.length === 0 && (
          <p>No posts to display.</p>
        )}
        <TransitionGroup>
          {!loading &&
            !error &&
            data.getPosts.length > 0 &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id}>
                <Post post={post} />
              </Grid.Column>
            ))}
        </TransitionGroup>
      </Grid.Row>
    </Grid>
  );
}

export default Home;

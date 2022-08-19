import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Grid, Image, Form } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/Auth";
import classes from "./PostDetail.module.css";
import { FETCH_POST } from "../queries/fetch-post";
import { CREATE_COMMENT } from "../queries/create-comment";
import LikeButton from "../components/UI/LikeButton";
import DeleteButton from "../components/UI/DeleteButton";
import CommentButton from "../components/UI/CommentButton";
import Comments from "../components/Comments/Comments";

function PostDetail(props) {
  const [commentBody, setCommentBody] = useState("");
  const [commentError, setCommentError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: { postId },
  });
  const [submitComment] = useMutation(CREATE_COMMENT, {
    update() {
      setCommentBody("");
      setCommentError(null);
    },
    onError(err) {
      setCommentError(err.message);
    },
    variables: { postId, body: commentBody },
  });

  const submitCommentHandler = (event) => {
    event.preventDefault();
    if (!commentError) {
      submitComment();
    }
  };
  let markup;
  if (loading && !error) {
    markup = <p>loading..</p>;
  }
  if (!loading && error) {
    markup = <p>Error: {error.message}</p>;
  }
  if (!error && data && data.getPost) {
    const {
      id,
      body,
      username,
      createdAt,
      likeCount,
      commentCount,
      comments,
      likes,
    } = data.getPost;
    const deletePostCallback = () => {
      navigate("/");
    };
    markup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <CommentButton
                  user={user}
                  post={{ id, commentCount, comments }}
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment:</p>
                  <Form onSubmit={submitCommentHandler}>
                    <Form.Input
                      fluid
                      type="text"
                      placeholder="Comment..."
                      floated="left"
                      attached="left"
                      name="comment"
                      onChange={(event) => {
                        if (event.target.value.trim() !== "") {
                          setCommentError("");
                        }
                        setCommentBody(event.target.value);
                      }}
                      value={commentBody}
                      action={{ content: "submit", color: "teal" }}
                    />
                    {commentError && (
                      <p className={classes["error-message"]}>{commentError}</p>
                    )}
                  </Form>
                </Card.Content>
              </Card>
            )}
            <Comments comments={comments} postId={id} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return markup;
}

export default PostDetail;

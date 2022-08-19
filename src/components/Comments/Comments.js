import moment from "moment";
import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import DeleteButton from "../UI/DeleteButton";
import { AuthContext } from "../../context/Auth";

function Comments({ postId, comments }) {
  const { user } = useContext(AuthContext);
  return comments.map((comment) => (
    <Card fluid key={comment.id}>
      <Card.Content>
        {user && user.username === comment.username && (
          <DeleteButton postId={postId} commentId={comment.id} />
        )}
        <Card.Header>{comment.username}</Card.Header>
        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
      </Card.Content>
    </Card>
  ));
}

export default Comments;

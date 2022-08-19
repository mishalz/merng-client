import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import LikeButton from "../UI/LikeButton";
import DeleteButton from "../UI/DeleteButton";
import CommentButton from "../UI/CommentButton";

function Post({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid style={{ marginBottom: 10 }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likeCount, likes }} />
        <CommentButton user={user} post={{ id, commentCount, comments }} />

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default Post;

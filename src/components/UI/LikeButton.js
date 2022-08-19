import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LIKE_POST } from "../../queries/like-post";
import { useMutation } from "@apollo/client";

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);
  const [likePost] = useMutation(LIKE_POST, { variables: { postId: id } });
  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );
  return (
    <Popup
      content={liked ? "Unlike post" : "Like post"}
      trigger={
        <Button
          as="div"
          labelPosition="right"
          onClick={user ? likePost : () => {}}
        >
          {likeButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    ></Popup>
  );
}

export default LikeButton;
